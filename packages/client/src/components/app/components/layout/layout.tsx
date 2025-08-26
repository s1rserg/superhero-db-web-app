import { Outlet } from 'react-router-dom';
import { Header } from '~/components/header/header';
import styles from './styles.module.css';

const Layout = () => (
  <>
    <div className={styles['page-header']}>
      <Header />
    </div>
    <>
      <Outlet />
    </>
  </>
);

export default Layout;
