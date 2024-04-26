import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Layout from './components/Layout';
import Loader from './components/Loader';
import Protected from './components/Protected';

import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import PageNotFound from './pages/PageNotFound';
import ErrorPage from './pages/ErrorPage';

const Home = lazy(() => import('./pages/Home'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderHistory = lazy(() => import('./pages/OrderHistory'));
const OrderDetails = lazy(() => import('./pages/OrderDetails'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />

      <Route path='/' element={<Layout />} errorElement={<ErrorPage />}>
        <Route
          index
          element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          }
        />

        <Route
          path='products/:id'
          element={
            <Suspense fallback={<Loader />}>
              <ProductDetails />
            </Suspense>
          }
        />

        <Route
          path='cart'
          element={
            <Protected>
              <Suspense fallback={<Loader />}>
                <Cart />
              </Suspense>
            </Protected>
          }
        />

        <Route
          path='wishlist'
          element={
            <Protected>
              <Suspense fallback={<Loader />}>
                <Wishlist />
              </Suspense>
            </Protected>
          }
        />

        <Route
          path='checkout'
          element={
            <Protected>
              <Suspense fallback={<Loader />}>
                <Checkout />
              </Suspense>
            </Protected>
          }
        />

        <Route
          path='orders'
          element={
            <Protected>
              <Suspense fallback={<Loader />}>
                <OrderHistory />
              </Suspense>
            </Protected>
          }
        />

        <Route
          path='orders/:id'
          element={
            <Protected>
              <Suspense fallback={<Loader />}>
                <OrderDetails />
              </Suspense>
            </Protected>
          }
        />
      </Route>

      <Route path='*' element={<PageNotFound />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
