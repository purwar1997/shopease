import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCartItems, selectCartItems } from '../app/slices/cartSlice';
import CartItem from '../components/CartItem';
import EmptyCart from '../components/EmptyCart';

const Cart = () => {
  const status = useSelector(state => state.cart.status);
  const error = useSelector(state => state.cart.error);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, []);

  if (status === 'idle' || status === 'loading') {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className='max-w-3xl mx-auto flex flex-col items-center gap-10'>
      <h1 className='text-3xl'>Shopping cart</h1>

      <div className='w-full'>
        <ul className='divide-y divide-gray-200 border-y border-gray-200'>
          {cartItems.map(item => (
            <CartItem key={item.id} id={item.id} product={item.product} quantity={item.quantity} />
          ))}
        </ul>

        <div className='mt-8'>
          <div className='flex justify-between items-start'>
            <div>
              <p className='text-lg font-medium'>Subtotal</p>
              <p className='mt-1 text-gray-500 text-sm'>
                Shipping and taxes will be calculated at checkout.
              </p>
            </div>

            <p className='text-lg font-medium'>
              ₹{cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)}
            </p>
          </div>

          <div className='mt-7'>
            <Link to='/checkout'>
              <button className='w-full block bg-indigo-600 py-2.5 rounded-md text-white font-medium hover:bg-indigo-700'>
                Checkout
              </button>
            </Link>

            <p className='mt-5 text-center'>
              or{' '}
              <Link className='text-indigo-600 font-medium hover:text-indigo-500' to='/'>
                Continue Shopping
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
