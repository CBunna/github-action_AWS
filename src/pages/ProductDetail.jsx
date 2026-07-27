import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import productsData from '../data/products.json';
import { useCart } from '../hooks/useCart';
import { Button } from '../components/Button';
import { ProductCard } from '../components/ProductCard';
import styles from './ProductDetail.module.css';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  const product = productsData.find((p) => p.id === id);

  if (!product) {
    return (
      <main className={`container ${styles.notFoundContainer}`}>
        <h2>Product Not Found</h2>
        <p>Sorry, the cat product you are looking for does not exist.</p>
        <Button onClick={() => navigate('/')}>Back to Shop</Button>
      </main>
    );
  }

  const { name, category, price, description, imageUrl, inStock } = product;

  // Related products from the same category (excluding current product)
  const relatedProducts = productsData
    .filter((p) => p.category === category && p.id !== id)
    .slice(0, 3);

  const handleAddToCart = () => {
    if (inStock && quantity > 0) {
      addItem(product, quantity);
      setAddedMessage(true);
      setTimeout(() => setAddedMessage(false), 2500);
    }
  };

  return (
    <main className={`container ${styles.detailContainer}`}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link to="/">Home</Link> &gt;{' '}
        <span className={styles.categoryName}>{category}</span> &gt;{' '}
        <span>{name}</span>
      </nav>

      <div className={styles.productGrid}>
        <div className={styles.imageContainer}>
          <img src={imageUrl} alt={name} className={styles.mainImage} />
          <span className={styles.badge}>{category}</span>
        </div>

        <div className={styles.infoContainer}>
          <h1 className={styles.title}>{name}</h1>
          <div className={styles.priceRow}>
            <span className={styles.price}>${price.toFixed(2)}</span>
            <span
              className={
                inStock
                  ? `${styles.stockBadge} ${styles.inStock}`
                  : `${styles.stockBadge} ${styles.outOfStock}`
              }
            >
              {inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <p className={styles.description}>{description}</p>

          {inStock && (
            <div className={styles.purchaseControls}>
              <div className={styles.quantitySelector}>
                <label
                  htmlFor="quantity-input"
                  className={styles.quantityLabel}
                >
                  Quantity:
                </label>
                <div className={styles.quantityStepper}>
                  <button
                    type="button"
                    className={styles.stepBtn}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <input
                    id="quantity-input"
                    type="number"
                    min="1"
                    max="99"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setQuantity(isNaN(val) || val < 1 ? 1 : val);
                    }}
                    className={styles.quantityInput}
                  />
                  <button
                    type="button"
                    className={styles.stepBtn}
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <Button
                size="lg"
                onClick={handleAddToCart}
                ariaLabel={`Add ${quantity} of ${name} to cart`}
              >
                Add to Cart
              </Button>
            </div>
          )}

          {addedMessage && (
            <div className={styles.successMessage} role="status">
              ✓ Added {quantity} item{quantity > 1 ? 's' : ''} to your cart!{' '}
              <Link to="/cart" className={styles.cartLink}>
                View Cart
              </Link>
            </div>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>
            Related Products You Might Like
          </h2>
          <div className={styles.relatedGrid}>
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
