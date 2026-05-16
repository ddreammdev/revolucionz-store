import {Carousel} from '~/components/ui';
import {ProductCatalog} from '~/components/product';
import {HeroBackground} from '~/components/layout';
import {useLenis} from '~/lib/smooth-scroll';

export const meta: Route.MetaFunction = () => {
  return [{title: 'RevolucionZ | Suplementos'}];
};

export async function loader() {
  return {};
}

export default function Homepage() {
  return (
    <div className="home">
      <Hero />
      <Carousel />
      <ProductCatalog />
    </div>
  );
}

function Hero() {
  const lenis = useLenis();
  return (
    <section className="hero">
      <HeroBackground />
      <div className="hero-content">
        <h1 className="hero-title">REVOLUCIONA<br />TU ENTRENAMIENTO</h1>
        <p className="hero-desc">
          Suplementos de alta calidad para potenciar tu rendimiento y alcanzar tus metas fitness.
        </p>
        <button
          className="hero-btn"
          onClick={() => lenis?.scrollTo('#productos')}
        >
          EXPLORAR PRODUCTOS
        </button>
      </div>
    </section>
  );
}


