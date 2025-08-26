import { createHashRouter, RouterProvider } from 'react-router-dom';
import { createRoutes } from './components/router-config/router-config';
import './styles.module.css';

const App: React.FC = () => {
  const routes = createRoutes();
  const router = createHashRouter(routes);

  return <RouterProvider router={router} />;
};

export default App;
