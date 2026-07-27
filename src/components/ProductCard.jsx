import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { Button } from './Button';
import styles from './ProductCard.module.css';

export function ProductCard({ product }) {
  const { addItem } = useCart();
  const { id, name, category, price, imageUrl, inStock } = product;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inStock) {
      addItem(product, 1);
    }
  };

  return (
    <article className={styles.card}>
      <Link to={`/product/${id}`} className={styles.imageLink} tabIndex="-1">
        <div className={styles.imageWrapper}>
          <img
            src={imageUrl}
            alt={name}
            className={styles.image}
            loading="lazy"
          />
          <span className={styles.categoryBadge}>{category}</span>
        </div>
      </Link>

      <div className={styles.content}>
        <Link to={`/product/${id}`} className={styles.titleLink}>
          <h3 className={styles.title}>{name}</h3>
        </Link>

        <div className={styles.footer}>
          <div className={styles.priceContainer}>
            <span className={styles.price}>${price.toFixed(2)}</span>
            {!inStock && (
              <span className={styles.outOfStock}>Out of Stock</span>
            )}
          </div>

          <Button
            variant={inStock ? 'primary' : 'outline'}
            size="sm"
            disabled={!inStock}
            onClick={handleAddToCart}
            ariaLabel={`Add ${name} to cart`}
          >
            {inStock ? 'Add to Cart' : 'Unavailable'}
          </Button>
        </div>
      </div>
    </article>
  );
}
