import { RouteObject } from 'react-router-dom';
import { AppPath } from '~/common/enums/enums';
import Layout from '../layout/layout';
import { NotFound } from '~/pages/not-found/not-found';
import { Superheroes } from '~/pages/superheroes/superheroes';
import { Superhero } from '~/pages/superhero/superhero';

export const createRoutes = (): RouteObject[] => [
  {
    path: AppPath.ROOT,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Superheroes />,
      },
      {
        path: `${AppPath.SUPERHEROES}/:id`,
        element: <Superhero />,
      },
      {
        path: AppPath.ANY,
        element: <NotFound />,
      },
    ],
  },
];
