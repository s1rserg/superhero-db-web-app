import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <Link to="/" className={styles.header__logo}>
          Superhero DB
        </Link>
      </div>
    </header>
  );
};

export { Header };
