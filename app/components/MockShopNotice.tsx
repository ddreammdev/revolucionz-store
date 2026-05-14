export function MockShopNotice() {
  return (
    <section
      className="mock-shop-notice"
      aria-labelledby="mock-shop-notice-heading"
    >
      <div className="inner">
        <h2 id="mock-shop-notice-heading">Bienvenido a RevolucionZ</h2>
        <p>
          Estás viendo productos mock porque no hay una tienda conectada
          a este proyecto aún.
        </p>
        <p>
          Vincula tu tienda ejecutando <code>npx shopify hydrogen link</code> en tu
          terminal.
        </p>
      </div>
    </section>
  );
}
