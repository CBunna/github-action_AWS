import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import styles from './NotFound.module.css';

export function NotFound() {
  return (
    <main className={`container ${styles.container}`}>
      <div className={styles.card}>
        <span className={styles.catEmoji}>😿</span>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.message}>
          Oops! The cat must have knocked this page off the table.
        </p>
        <Link to="/">
          <Button size="lg">Return to Cat Shop</Button>
        </Link>
      </div>
    </main>
  );
}
