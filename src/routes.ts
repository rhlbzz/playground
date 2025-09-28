// src/routes.ts
import type { RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import React from 'react';
import Root from './root/Root';

const routes: RouteObject[] = [
  {
    path: '/',
    element: React.createElement(Root),
    errorElement: React.createElement(ErrorPage),
    children: [
      {
        index: true,
        element: React.createElement(Home),
      }, {
        path: 'torch-effect',
        element: React.createElement(React.lazy(() => import('./pages/TorchPage'))),
      }
    ],
  },
];

export default routes;