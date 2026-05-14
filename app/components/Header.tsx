import {Suspense, useRef, useEffect, useState} from 'react';
import {Await, NavLink, useAsyncValue, useLocation} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import type Lenis from 'lenis';
import {useAside} from '~/components/Aside';
import {ThemeToggle} from '~/components/ThemeToggle';
import {useLenis} from '~/lib/smooth-scroll';
import logoSvg from 'app/assets/logo-revolucionz.svg';
import {Search, ShoppingCart, User, Menu} from 'lucide-react';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {shop} = header;
  const headerRef = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const l = lenis;
    if (!l) return;
    const VELOCITY_THRESHOLD = 15;

    function onLenisScroll({scroll, velocity, direction}: {scroll: number; velocity: number; direction: number}) {
      if (direction === 1 && scroll > 80 && velocity > VELOCITY_THRESHOLD) {
        setHidden(true);
      } else if (direction === -1) {
        setHidden(false);
      }
    }

    l.on('scroll', onLenisScroll);
    return () => l.off('scroll', onLenisScroll);
  }, [lenis]);

  return (
    <header
      ref={headerRef}
      className={`header${hidden ? ' header-hidden' : ''}`}
    >
      <div className="header-inner">
        <NavLink prefetch="intent" to="/" className="header-logo" end>
          <img src={logoSvg} alt="Revolucionz" />
        </NavLink>
        <HeaderMenu viewport="desktop" />
        <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
      </div>
    </header>
  );
}

function scrollToTop(lenis: Lenis | null) {
  if (lenis) lenis.scrollTo(0);
}

function scrollToProductos(lenis: Lenis | null) {
  if (lenis) lenis.scrollTo('#productos');
}

export function HeaderMenu({
  viewport,
}: {
  menu?: HeaderProps['header']['menu'];
  primaryDomainUrl?: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain?: HeaderProps['publicStoreDomain'];
}) {
  const className = `header-menu-${viewport}`;
  const {close} = useAside();
  const lenis = useLenis();
  const location = useLocation();
  const isProductPage = location.pathname.match(/\/productos\//);

  return (
    <nav className={className} role="navigation">
      <button
        className="header-menu-item reset"
        onClick={() => {
          scrollToTop(lenis);
          close();
        }}
      >
        Inicio
      </button>
      {!isProductPage && (
        <button
          className="header-menu-item reset"
          onClick={() => {
            scrollToProductos(lenis);
            close();
          }}
        >
          Productos
        </button>
      )}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="header-ctas" role="navigation">
      <ThemeToggle />
      <HeaderMenuMobileToggle />
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        <Suspense fallback={<User size={20} />}>
          <Await resolve={isLoggedIn} errorElement={<User size={20} />}>
            {(isLoggedIn) =>
              isLoggedIn ? <User size={20} /> : <User size={20} />
            }
          </Await>
        </Suspense>
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset"
      onClick={() => open('mobile')}
    >
      <Menu size={20} />
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button className="reset" onClick={() => open('search')}>
      <Search size={20} />
    </button>
  );
}

function CartBadge({count}: {count: number}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
      className="cart-badge"
    >
      <ShoppingCart size={20} />
      {count > 0 && <span>{count}</span>}
    </a>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? '600' : undefined,
    color: isPending ? 'var(--page-text-secondary)' : 'var(--page-text)',
  };
}
