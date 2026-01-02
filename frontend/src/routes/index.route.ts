import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainRoutes from './main.route';
import AuthRoutes from './auth.route';
import NotFound from '../pages/not-found';

const Router = createBrowserRouter([
  MainRoutes,
  AuthRoutes,
  {
    path: '*',
    element: React.createElement(NotFound),
  },
]);

export default Router;