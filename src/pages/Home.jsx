import { useState, useMemo } from 'react';
import productsData from '../data/products.json';
import { ProductCard } from '../components/ProductCard';
import styles from './Home.module.css';

const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'toys', label: 'Toys' },
  { id: 'food', label: 'Food & Treats' },
  { id: 'beds', label: 'Beds & Trees' },
  { id: 'accessories', label: 'Accessories' },
];

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main className={styles.homePage}>
      {/* Hero Banner */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroText}>
            <span className={styles.badge}>🐾 Spoil Your Feline</span>
            <h1 className={styles.heroTitle}>Everything Your Cat Dreams Of</h1>
            <p className={styles.heroSubtitle}>
              From interactive toys and cozy beds to nutritious meals and
              accessories. Quality tested by cats, approved by humans.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className={`container ${styles.catalogSection}`}>
        <div className={styles.filterControls}>
          <div className={styles.searchBox}>
            <label htmlFor="search-input" className="visually-hidden">
              Search cat products by name
            </label>
            <input
              id="search-input"
              type="search"
              placeholder="Search products by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div
            className={styles.categoryTabs}
            role="tablist"
            aria-label="Product categories"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={selectedCategory === cat.id}
                className={
                  selectedCategory === cat.id
                    ? `${styles.categoryTab} ${styles.activeTab}`
                    : styles.categoryTab
                }
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className={styles.productGrid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <h3>No products found</h3>
            <p>
              Try searching for a different item or select another category.
            </p>
            <button
              className={styles.resetButton}
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
