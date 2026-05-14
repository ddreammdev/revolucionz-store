import {useState, useMemo} from 'react';
import {Search, SlidersHorizontal} from 'lucide-react';

import imgAdelgazate from '~/assets/products/adelgazate.avif';
import imgColageno from '~/assets/products/colageno.avif';
import imgDetoxZ from '~/assets/products/detox-z.avif';
import imgDivaz from '~/assets/products/divaz.avif';
import imgEroz from '~/assets/products/eroz.avif';
import imgGlutationDp from '~/assets/products/glutation-doypack.avif';
import imgGlutation from '~/assets/products/glutation.avif';
import imgHepaZ from '~/assets/products/hepa-z.avif';
import imgRevitalizateDp from '~/assets/products/revitalizate-doypack.avif';

const products = [
  {
    id: 1,
    name: 'Adelgazate',
    img: imgAdelgazate,
    price: 29.99,
    category: 'Quemadores',
  },
  {id: 2, name: 'Colágeno', img: imgColageno, price: 34.99, category: 'Salud'},
  {
    id: 3,
    name: 'Detox-Z',
    img: imgDetoxZ,
    price: 27.99,
    category: 'Quemadores',
  },
  {id: 4, name: 'Divaz', img: imgDivaz, price: 31.99, category: 'Vitaminas'},
  {id: 5, name: 'Eroz', img: imgEroz, price: 36.99, category: 'Pre-Entreno'},
  {
    id: 6,
    name: 'Glutation Doypack',
    img: imgGlutationDp,
    price: 39.99,
    category: 'Salud',
  },
  {
    id: 7,
    name: 'Glutation',
    img: imgGlutation,
    price: 37.99,
    category: 'Salud',
  },
  {id: 8, name: 'Hepa-Z', img: imgHepaZ, price: 28.99, category: 'Salud'},
  {
    id: 9,
    name: 'Revitalizate Doypack',
    img: imgRevitalizateDp,
    price: 32.99,
    category: 'Vitaminas',
  },
];

const categories = ['Quemadores', 'Salud', 'Vitaminas', 'Pre-Entreno'];

export function ProductCatalog() {
  const [search, setSearch] = useState('');
  const [priceMax, setPriceMax] = useState(45);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchPrice = p.price <= priceMax;
      const matchCat =
        selectedCategories.length === 0 ||
        selectedCategories.includes(p.category);
      return matchSearch && matchPrice && matchCat;
    });
  }, [search, priceMax, selectedCategories]);

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  }

  return (
    <section id="productos" className="catalog">
      <div className="catalog-layout">
        <aside className="catalog-filters">
          <div className="catalog-filters-inner">
            <div className="catalog-filters-header">
              <SlidersHorizontal size={16} />
              <h3>Filtros</h3>
            </div>

            <div className="catalog-filter-group">
              <h4>Precio máximo</h4>
              <div className="catalog-price-range">
                <input
                  type="range"
                  min={20}
                  max={45}
                  step={1}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                />
                <span className="catalog-price-value">${priceMax}</span>
              </div>
            </div>

            <div className="catalog-filter-group">
              <h4>Categoría</h4>
              {categories.map((cat) => (
                <label key={cat} className="catalog-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <div className="catalog-main">
          <div className="catalog-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {filtered.length === 0 ? (
            <p className="catalog-empty">No se encontraron productos.</p>
          ) : (
            <div className="catalog-grid">
              {filtered.map((p) => (
                <div key={p.id} className="catalog-card">
                  <img src={p.img} alt={p.name} />
                  <h4>{p.name}</h4>
                  <span className="catalog-price">${p.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
