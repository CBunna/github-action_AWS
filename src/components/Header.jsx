import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { CartIcon } from './CartIcon';
import styles from './Header.module.css';

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link to="/" className={styles.logoLink} aria-label="Cat Shop Home">
          <span className={styles.logoIcon}>🐱</span>
          <span className={styles.logoText}>
            Cat<span className={styles.logoAccent}>Shop</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Main Navigation">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
            end
          >
            Products
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
            aria-label={`Shopping Cart, ${totalItems} items`}
          >
            <CartIcon count={totalItems} />
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
