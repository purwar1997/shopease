import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchWishlistAsync,
  selectWishlistItems,
  clearWishlistAsync,
} from '../app/slices/wishlistSlice';
import { fetchCartAsync } from '../app/slices/cartSlice';
import { selectLoggedInUser } from '../app/slices/userSlice';
import { classNames } from '../utils/helpers';
import WishlistItem from '../components/WishlistItem';
import EmptyWishlist from './EmptyWishlist';
import LoadingSpinner from '../components/LoadingSpinner';

const Wishlist = () => {
  const status = useSelector(state => state.wishlist.status);
  const wishlistItems = useSelector(selectWishlistItems);
  const error = useSelector(state => state.wishlist.error);
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  const [clearWishlistStatus, setClearWishlistStatus] = useState('idle');

  useEffect(() => {
    if (user) {
      dispatch(fetchWishlistAsync(user.id));
      dispatch(fetchCartAsync(user.id));
    }
  }, [dispatch, user]);

  const handleClearWishlist = async () => {
    try {
      setClearWishlistStatus('pending');
      await dispatch(clearWishlistAsync(wishlistItems.map(item => item.id))).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setClearWishlistStatus('idle');
    }
  };

  if (status === 'idle' || status === 'loading') {
    return <LoadingSpinner />;
  }

  if (error) {
    throw error;
  }

  if (wishlistItems.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <main className='page-height px-12 py-10 flex justify-center'>
      <div className='max-w-3xl w-full'>
        <header className='flex justify-between items-end'>
          <h1 className='text-3xl'>Wishlist</h1>

          <button
            className={classNames(
              'text-indigo-500 font-medium hover:text-indigo-600',
              clearWishlistStatus === 'pending' ? 'cursor-wait' : ''
            )}
            onClick={handleClearWishlist}
            disabled={clearWishlistStatus === 'pending'}
          >
            Clear wishlist
          </button>
        </header>

        <section className='mt-8'>
          <ul className='divide-y divide-gray-200 border-y border-gray-200'>
            {wishlistItems.toReversed().map(item => (
              <WishlistItem key={item.id} id={item.id} product={item.product} />
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default Wishlist;
