import {getProductBySlug} from '~/lib/product-data';
import {ProductView} from '~/components/ProductView';

export function meta({data}: {data: Record<string, unknown> | undefined}) {
  const product = data?.product as {name: string} | undefined;
  if (!product) {
    return [{title: 'Producto no encontrado | RevolucionZ'}];
  }
  return [{title: `${product.name} | RevolucionZ`}];
}

export async function loader({params}: {params: {slug: string}}) {
  const product = getProductBySlug(params.slug);
  return {product};
}

export default function ProductPage({
  loaderData,
}: {
  loaderData: {product: ReturnType<typeof getProductBySlug>};
}) {
  const {product} = loaderData;

  if (!product) {
    return (
      <div className="product-view">
        <header className="product-view-header">
          <a href="/" className="product-view-back">
            Volver a inicio
          </a>
        </header>
        <div className="product-view-not-found">
          <h1>Producto no encontrado</h1>
          <p>El producto que buscas no existe.</p>
        </div>
      </div>
    );
  }

  return <ProductView product={product} />;
}
