import { Link } from 'react-router-dom';
import image from '../assets/empty-cart.svg';

const EmptyCart = () => {
  return (
    <main className='page-height px-12 py-10 flex justify-center'>
      <div className='flex flex-col items-center'>
        <img className='w-96' src={image} alt='empty-cart' />
        <h1 className='mt-2 text-3xl'>Your cart is currently empty!</h1>
        <Link
          className='mt-9 bg-indigo-600 text-white font-medium hover:bg-indigo-700 px-7 py-3 rounded-full'
          to='/'
        >
          Return to shop
        </Link>
      </div>
    </main>
  );
};

export default EmptyCart;
