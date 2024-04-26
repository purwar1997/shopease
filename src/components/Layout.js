import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { fetchCartAsync } from '../app/slices/cartSlice';
import { selectLoggedInUser } from '../app/slices/userSlice';
import Navbar from './Navbar';

const Layout = () => {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchCartAsync(user.id));
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
