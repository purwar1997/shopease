import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartAsync } from '../app/slices/cartSlice';
import { fetchWishlistAsync } from '../app/slices/wishlistSlice';
import { fetchAddressesAsync } from '../app/slices/addressSlice';
import { selectLoggedInUser } from '../app/slices/userSlice';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  const user = useSelector(selectLoggedInUser);
  const cartError = useSelector(state => state.cart.error);
  const wishlistError = useSelector(state => state.wishlist.error);
  const addressError = useSelector(state => state.address.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchCartAsync(user.id));
      dispatch(fetchWishlistAsync(user.id));
      dispatch(fetchAddressesAsync(user.id));
    }
  }, [dispatch, user]);

  if (cartError) {
    throw cartError;
  }

  if (wishlistError) {
    throw wishlistError;
  }

  if (addressError) {
    throw addressError;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
