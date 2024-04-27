import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWishlistAsync, selectWishlistItems } from '../app/slices/wishlistSlice';
import { selectLoggedInUser } from '../app/slices/userSlice';
import WishlistItem from '../components/WishlistItem';
import EmptyWishlist from './EmptyWishlist';

const Wishlist = () => {
  const status = useSelector(state => state.wishlist.status);
  const wishlistItems = useSelector(selectWishlistItems);
  const error = useSelector(state => state.wishlist.error);
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchWishlistAsync(user.id));
    }
  }, [dispatch, user]);

  if (status === 'idle' || status === 'loading') {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error.message}</h2>;
  }

  if (wishlistItems.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <main className='page-height px-12 py-10 flex justify-center'>
      <div className='max-w-3xl mx-auto w-full'>
        <h1 className='text-3xl text-center'>Wishlist</h1>

        <section className='mt-10'>
          <ul className='divide-y divide-gray-200 border-y border-gray-200'>
            {wishlistItems.toReversed().map(item => (
              <WishlistItem key={item.id} id={item.id} product={item.product} userId={user.id} />
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default Wishlist;
