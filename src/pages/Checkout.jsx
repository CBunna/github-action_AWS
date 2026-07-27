import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { Button } from '../components/Button';
import styles from './Checkout.module.css';

export function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address) return;

    const generatedId = `CAT-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderConfirmed(true);
    clearCart();
  };

  if (orderConfirmed) {
    return (
      <main className={`container ${styles.confirmationContainer}`}>
        <div className={styles.confirmationCard}>
          <span className={styles.checkIcon}>🎉</span>
          <h1 className={styles.confirmationTitle}>Order Confirmed!</h1>
          <p className={styles.confirmationSubtitle}>
            Thank you for your order, <strong>{formData.name}</strong>! Your cat
            is going to love this.
          </p>
          <div className={styles.orderDetails}>
            <p>
              <strong>Order Number:</strong> {orderId}
            </p>
            <p>
              <strong>Confirmation Sent To:</strong> {formData.email}
            </p>
            <p>
              <strong>Shipping To:</strong> {formData.address}
              {formData.city ? `, ${formData.city}` : ''}
            </p>
          </div>
          <Button size="lg" onClick={() => navigate('/')}>
            Back to Shop
          </Button>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className={`container ${styles.emptyContainer}`}>
        <h2>Your cart is empty</h2>
        <p>Add some cat products to your cart before proceeding to checkout.</p>
        <Button onClick={() => navigate('/')}>Browse Products</Button>
      </main>
    );
  }

  return (
    <main className={`container ${styles.checkoutContainer}`}>
      <h1 className={styles.pageTitle}>Checkout</h1>

      <div className={styles.checkoutLayout}>
        <form onSubmit={handleSubmit} className={styles.formCard}>
          <h2 className={styles.sectionTitle}>Shipping Information</h2>

          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Full Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Whiskers Johnson"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. catlover@example.com"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address" className={styles.label}>
              Street Address *
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g. 123 Purrfect Lane"
              className={styles.input}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="city" className={styles.label}>
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Meowville"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="zipCode" className={styles.label}>
                Postal Code
              </label>
              <input
                id="zipCode"
                name="zipCode"
                type="text"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="e.g. 90210"
                className={styles.input}
              />
            </div>
          </div>

          <Button type="submit" size="lg" className={styles.submitBtn}>
            Place Order (${total.toFixed(2)})
          </Button>
        </form>

        <aside className={styles.summaryCard}>
          <h2 className={styles.sectionTitle}>Order Summary</h2>
          <div className={styles.itemsPreview}>
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className={styles.previewItem}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className={styles.previewImg}
                />
                <div className={styles.previewMeta}>
                  <span className={styles.previewName}>{product.name}</span>
                  <span className={styles.previewQty}>Qty: {quantity}</span>
                </div>
                <span className={styles.previewPrice}>
                  ${(product.price * quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.calcRow}>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.calcRow}>
            <span>Shipping</span>
            <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className={`${styles.calcRow} ${styles.totalCalc}`}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Link to="/cart" className={styles.backToCart}>
            &larr; Return to Cart
          </Link>
        </aside>
      </div>
    </main>
  );
}
