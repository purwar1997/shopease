import { Link } from 'react-router-dom';
import emptyCartImage from '../assets/empty-cart.svg';

const EmptyCart = () => {
  return (
    <section className='h-full flex flex-col items-center justify-center'>
      <img className='w-96' src={emptyCartImage} alt='empty-cart' />
      <h2 className='text-3xl'>Your cart is currently empty!</h2>
      <Link
        className='inline-block mt-9 bg-indigo-600 text-white font-medium hover:bg-indigo-700 px-7 py-3 rounded-full'
        to='/'
      >
        Return To Shop
      </Link>
    </section>
  );
};

export default EmptyCart;
