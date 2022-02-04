import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LazyElement from './LazyElement';
import ProtectedElement from './ProtectedElement';
import ROUTES from './constants';

const Login = React.lazy(() => import('pages/Login/Login'));
const SignUp = React.lazy(() => import('pages/SignUp/SignUp'));
const Home = React.lazy(() => import('pages/Home/Home'));
const Purchase = React.lazy(() => import('pages/Purchase/Purchase'));
const Products = React.lazy(() => import('pages/Products/Products'));
const NotFound = React.lazy(() => import('pages/NotFound/NotFound'));

const VendingMachineRoutes: React.FC = () => (
  <Routes>
    <Route path={ROUTES.LOGIN} element={<LazyElement Component={Login} />} />
    <Route path={ROUTES.SIGN_UP} element={<LazyElement Component={SignUp} />} />

    <Route path={ROUTES.HOME} element={<ProtectedElement Component={Home} />} />
    <Route
      path={ROUTES.PURCHASE}
      element={<ProtectedElement Component={Purchase} />}
    />

    <Route
      path={ROUTES.PRODUCTS}
      element={<ProtectedElement isForSeller Component={Products} />}
    />

    <Route path="*" element={<LazyElement Component={NotFound} />} />
  </Routes>
);

export default VendingMachineRoutes;
