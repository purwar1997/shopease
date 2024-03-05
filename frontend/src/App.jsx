import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Home from './pages/Home';
import Loader from './components/Loader';

const Search = lazy(() => import('./pages/Search'));
const Cart = lazy(() => import('./pages/Cart'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />

      <Route
        path='search'
        element={
          <Suspense fallback={<Loader />}>
            <Search />
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
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
