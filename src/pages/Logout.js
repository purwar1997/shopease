import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedInUser, logoutAsync } from '../app/slices/userSlice';
import { clearCart } from '../app/slices/cartSlice';
import { clearWishlist } from '../app/slices/wishlistSlice';
import LoadingSpinner from '../components/LoadingSpinner';

const Logout = () => {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      await dispatch(logoutAsync()).unwrap();
      dispatch(clearCart());
      dispatch(clearWishlist());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSignout();
  }, []);

  return user ? <LoadingSpinner /> : <Navigate to='/login' replace={true} />;
};

export default Logout;
