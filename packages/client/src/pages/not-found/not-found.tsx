import styles from './styles.module.css';
import { AppPath } from '~/common/enums/enums';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className={styles['container']}>
      <span className={styles['decoration']}>404</span>
      <h1 className={styles['title']}>Something went wrong</h1>
      <p className={styles['text']}>Sorry, we can’t find the page you’re looking for.</p>
      <Link className={styles['button']} to={AppPath.ROOT}>
        Back to home
      </Link>
    </main>
  );
};

export { NotFound };
