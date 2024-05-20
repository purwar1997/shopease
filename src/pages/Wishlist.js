import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWishlistAsync, selectWishlistItems } from '../app/slices/wishlistSlice';
import { fetchCartAsync } from '../app/slices/cartSlice';
import { selectLoggedInUser } from '../app/slices/userSlice';
import WishlistItem from '../components/WishlistItem';
import EmptyWishlist from './EmptyWishlist';
import LoadingSpinner from '../components/LoadingSpinner';

const Wishlist = () => {
  const status = useSelector(state => state.wishlist.status);
  const wishlistItems = useSelector(selectWishlistItems);
  const error = useSelector(state => state.wishlist.error);
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchWishlistAsync(user.id));
      dispatch(fetchCartAsync(user.id));
    }
  }, [dispatch, user]);

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
    <main className='page-height px-12 py-10 flex flex-col items-center gap-10'>
      <h1 className='text-3xl'>Wishlist</h1>

      <section className='max-w-3xl w-full'>
        <ul className='divide-y divide-gray-200 border-y border-gray-200'>
          {wishlistItems.toReversed().map(item => (
            <WishlistItem key={item.id} id={item.id} product={item.product} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Wishlist;
