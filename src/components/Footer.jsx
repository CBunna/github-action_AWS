import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.brand}>
          <span className={styles.logo}>🐱 CatShop</span>
          <p className={styles.tagline}>
            Premium toys, nutritious food, and cozy beds for your favorite
            feline.
          </p>
        </div>
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} CatShop. All rights reserved.
          Crafted with care for cats everywhere.
        </div>
      </div>
    </footer>
  );
}
