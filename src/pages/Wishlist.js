import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWishlistAsync, selectWishlistItems } from '../app/slices/wishlistSlice';
import { selectLoggedInUser } from '../app/slices/authSlice';
import WishlistItem from '../components/WishlistItem';

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
    return <h2>Empty wishlist</h2>;
  }

  return (
    <section className='max-w-3xl mx-auto flex flex-col items-center gap-10'>
      <h1 className='text-3xl'>Wishlist</h1>

      <div className='w-full'>
        <ul className='divide-y divide-gray-200 border-y border-gray-200'>
          {wishlistItems.toReversed().map(item => (
            <WishlistItem key={item.id} id={item.id} product={item.product} userId={user.id} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Wishlist;
