import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { fetchCartItems } from '../app/slices/cartSlice';
import { selectLoggedInUser } from '../app/slices/authSlice';
import Navbar from './Navbar';

const Layout = () => {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user]);

  return (
    <Fragment>
      <Navbar />

      <main className='page-height px-12 py-10'>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default Layout;
