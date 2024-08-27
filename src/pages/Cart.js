import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaRegBookmark, FaChevronRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import {
  fetchCartAsync,
  selectCartItems,
  selectCartCount,
  clearCartAsync,
} from '../app/slices/cartSlice';
import { fetchWishlistAsync, selectWishlistCount } from '../app/slices/wishlistSlice';
import { selectLoggedInUser } from '../app/slices/userSlice';
import { classNames, roundTwoDecimalPlaces } from '../services';
import CartItem from '../components/CartItem';
import EmptyCart from '../pages/EmptyCart';
import LoadingSpinner from '../components/LoadingSpinner';

const Cart = () => {
  const status = useSelector(state => state.cart.status);
  const error = useSelector(state => state.cart.error);
  const cartItems = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlistCount);
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  const [clearCartStatus, setClearCartStatus] = useState('idle');

  useEffect(() => {
    if (user) {
      dispatch(fetchCartAsync(user.id));
      dispatch(fetchWishlistAsync(user.id));
    }
  }, [dispatch, user]);

  const handleClearCart = async () => {
    try {
      setClearCartStatus('pending');
      await dispatch(clearCartAsync(cartItems.map(item => item.id))).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setClearCartStatus('idle');
    }
  };

  if (status === 'idle' || status === 'loading') {
    return <LoadingSpinner />;
  }

  if (error) {
    throw error;
  }

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <main className='page-height px-12 py-10 flex justify-center'>
      <div className='max-w-3xl w-full'>
        <header className='flex justify-between items-end'>
          <h1 className='text-3xl'>Shopping cart</h1>

          <button
            className={classNames(
              'font-medium text-indigo-500 hover:text-indigo-600',
              clearCartStatus === 'pending' ? 'cursor-wait' : ''
            )}
            onClick={handleClearCart}
            disabled={clearCartStatus === 'pending'}
          >
            Clear cart
          </button>
        </header>

        <section className='mt-8'>
          <ul className='divide-y divide-gray-200 border-y border-gray-200'>
            {cartItems.toReversed().map(item => (
              <CartItem
                key={item.id}
                id={item.id}
                product={item.product}
                quantity={item.quantity}
              />
            ))}
          </ul>

          <div className='mt-8'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-lg font-medium'>Subtotal ({cartCount} items)</p>
                <p className='mt-1 text-gray-500 text-sm'>
                  Shipping and taxes will be calculated at checkout.
                </p>
              </div>

              <p className='text-lg font-medium'>
                ₹
                {roundTwoDecimalPlaces(
                  cartItems.reduce((amount, item) => amount + item.product.price * item.quantity, 0)
                )}
              </p>
            </div>

            {wishlistCount > 0 && (
              <Link to='/wishlist'>
                <div className='group mt-7 border border-gray-200 rounded px-4 py-3.5 flex justify-between items-center'>
                  <p className='flex items-center gap-3'>
                    <FaRegBookmark />

                    <span className='group-hover:underline underline-offset-2'>
                      Add more from wishlist
                    </span>
                  </p>

                  <FaChevronRight className='text-sm' />
                </div>
              </Link>
            )}

            <div className='mt-7'>
              <Link to='/checkout'>
                <button className='w-full h-11 block bg-indigo-600 rounded-md text-white font-medium hover:bg-indigo-700'>
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
        </section>
      </div>
    </main>
  );
};

export default Cart;
