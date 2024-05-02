import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';
import Protected from './components/Protected';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Logout from './pages/Logout';
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
const Addresses = lazy(() => import('./pages/Addresses'));
const AddNewAddress = lazy(() => import('./pages/AddNewAddress'));
const UpdateAddress = lazy(() => import('./pages/UpdateAddress'));
const EditProfile = lazy(() => import('./pages/EditProfle'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />

      <Route path='/' element={<Layout />} errorElement={<ErrorPage />}>
        <Route
          index
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Home />
            </Suspense>
          }
        />

        <Route
          path='products/:id'
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProductDetails />
            </Suspense>
          }
        />

        <Route
          path='cart'
          element={
            <Protected>
              <Suspense fallback={<LoadingSpinner />}>
                <Cart />
              </Suspense>
            </Protected>
          }
        />

        <Route
          path='wishlist'
          element={
            <Protected>
              <Suspense fallback={<LoadingSpinner />}>
                <Wishlist />
              </Suspense>
            </Protected>
          }
        />

        <Route
          path='checkout'
          element={
            <Protected>
              <Suspense fallback={<LoadingSpinner />}>
                <Checkout />
              </Suspense>
            </Protected>
          }
        />

        <Route
          path='orders'
          element={
            <Protected>
              <Suspense fallback={<LoadingSpinner />}>
                <OrderHistory />
              </Suspense>
            </Protected>
          }
        />

        <Route
          path='orders/:id'
          element={
            <Protected>
              <Suspense fallback={<LoadingSpinner />}>
                <OrderDetails />
              </Suspense>
            </Protected>
          }
        />

        <Route
          path='addresses'
          element={
            <Protected>
              <Suspense fallback={<LoadingSpinner />}>
                <Addresses />
              </Suspense>
            </Protected>
          }
        />

        <Route
          path='addresses/add'
          element={
            <Protected>
              <Suspense fallback={<LoadingSpinner />}>
                <AddNewAddress />
              </Suspense>
            </Protected>
          }
        />

        <Route
          path='addresses/:id/edit'
          element={
            <Protected>
              <Suspense fallback={<LoadingSpinner />}>
                <UpdateAddress />
              </Suspense>
            </Protected>
          }
        />

        <Route
          path='profile'
          element={
            <Protected>
              <Suspense fallback={<LoadingSpinner />}>
                <EditProfile />
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
