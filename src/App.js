import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Layout from './components/Layout';
import Loader from './components/Loader';

const Home = lazy(() => import('./pages/Home'));
const Cart = lazy(() => import('./pages/Cart'));
const ProductList = lazy(() => import('./components/ProductList'));
const Categories = lazy(() => import('./pages/Categories'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route
        index
        element={
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        }
      />

      <Route
        path='products'
        element={
          <Suspense fallback={<Loader />}>
            <ProductList />
          </Suspense>
        }
      />

      <Route
        path='cart'
        element={
          <Suspense fallback={<Loader />}>
            <Cart />
          </Suspense>
        }
      />

      <Route
        path='categories'
        element={
          <Suspense fallback={<Loader />}>
            <Categories />
          </Suspense>
        }
      />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
