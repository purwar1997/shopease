import { Link } from 'react-router-dom';
import image from '../assets/empty-wishlist.png';

const EmptyWishlist = () => {
  return (
    <section className='h-full flex flex-col items-center justify-center py-2'>
      <h1 className='text-3xl'>Your wishlist is empty</h1>
      <p className='mt-5 text-gray-500'>
        Add items that you like to your wishlist. Review them anytime and easily move them to the
        bag.
      </p>
      <img className='mt-2 w-80' src={image} alt='empty-wishlist' />
      <Link
        className='inline-block mt-2 bg-indigo-600 text-white font-medium hover:bg-indigo-700 px-7 py-3 rounded-full'
        to='/'
      >
        Continue Shopping
      </Link>
    </section>
  );
};

export default EmptyWishlist;
