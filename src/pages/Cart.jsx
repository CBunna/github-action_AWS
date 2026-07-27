import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { Button } from '../components/Button';
import styles from './Cart.module.css';

export function Cart() {
  const { cart, removeItem, updateQuantity, clearCart, subtotal, totalItems } =
    useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <main className={`container ${styles.emptyCartContainer}`}>
        <div className={styles.emptyCard}>
          <span className={styles.emptyIcon}>🛒</span>
          <h2>Your cart is empty</h2>
          <p>
            Looks like you haven&apos;t added any cat goodies to your cart yet.
          </p>
          <Button onClick={() => navigate('/')} size="lg">
            Explore Products
          </Button>
        </div>
      </main>
    );
  }

  const shipping = subtotal > 50 ? 0 : 4.99;
  const grandTotal = subtotal + shipping;

  return (
    <main className={`container ${styles.cartContainer}`}>
      <div className={styles.cartHeader}>
        <h1 className={styles.title}>Shopping Cart</h1>
        <button
          className={styles.clearBtn}
          onClick={clearCart}
          aria-label="Clear all items from cart"
        >
          Clear Cart
        </button>
      </div>

      <div className={styles.cartLayout}>
        <section className={styles.itemsList} aria-label="Cart Items">
          {cart.map(({ product, quantity }) => (
            <article key={product.id} className={styles.cartItem}>
              <img
                src={product.imageUrl}
                alt={product.name}
                className={styles.itemImage}
              />

              <div className={styles.itemDetails}>
                <Link to={`/product/${product.id}`} className={styles.itemName}>
                  {product.name}
                </Link>
                <span className={styles.itemCategory}>{product.category}</span>
                <span className={styles.itemUnitPrice}>
                  ${product.price.toFixed(2)} each
                </span>
              </div>

              <div className={styles.itemQuantityContainer}>
                <label
                  htmlFor={`quantity-${product.id}`}
                  className="visually-hidden"
                >
                  Quantity for {product.name}
                </label>
                <div className={styles.stepper}>
                  <button
                    type="button"
                    className={styles.stepperBtn}
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    aria-label={`Decrease quantity of ${product.name}`}
                  >
                    -
                  </button>
                  <input
                    id={`quantity-${product.id}`}
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      updateQuantity(
                        product.id,
                        isNaN(val) || val < 1 ? 1 : val
                      );
                    }}
                    className={styles.stepperInput}
                  />
                  <button
                    type="button"
                    className={styles.stepperBtn}
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    aria-label={`Increase quantity of ${product.name}`}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={styles.itemTotalPrice}>
                ${(product.price * quantity).toFixed(2)}
              </div>

              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeItem(product.id)}
                aria-label={`Remove ${product.name} from cart`}
              >
                ✕
              </button>
            </article>
          ))}
        </section>

        <aside className={styles.summaryCard} aria-label="Order Summary">
          <h2 className={styles.summaryTitle}>Order Summary</h2>

          <div className={styles.summaryRow}>
            <span>Subtotal ({totalItems} items)</span>
            <span data-testid="cart-subtotal">${subtotal.toFixed(2)}</span>
          </div>

          <div className={styles.summaryRow}>
            <span>Estimated Shipping</span>
            <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
          </div>

          {shipping > 0 && (
            <p className={styles.freeShippingTip}>
              Add ${(50 - subtotal).toFixed(2)} more for FREE shipping!
            </p>
          )}

          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span>Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

          <Button
            size="lg"
            className={styles.checkoutBtn}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </Button>

          <Link to="/" className={styles.continueLink}>
            &larr; Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}
