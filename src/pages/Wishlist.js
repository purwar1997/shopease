import { useSelector } from 'react-redux';
import { selectWishlistItems } from '../app/slices/wishlistSlice';
import WishlistItem from '../components/WishlistItem';
import EmptyWishlist from './EmptyWishlist';
import LoadingSpinner from '../components/LoadingSpinner';

const Wishlist = () => {
  const status = useSelector(state => state.wishlist.status);
  const wishlistItems = useSelector(selectWishlistItems);

  if (status === 'idle' || status === 'loading') {
    return <LoadingSpinner />;
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
              <WishlistItem key={item.id} id={item.id} product={item.product} />
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default Wishlist;
