import { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaStar, FaHeart, FaRegHeart, FaArrowRight } from 'react-icons/fa6';
import { fetchProductByIdAsync } from '../app/slices/productSlice';
import {
  fetchCartAsync,
  addToCartAsync,
  updateQuantityAsync,
  selectCartItemById,
} from '../app/slices/cartSlice';
import {
  fetchWishlistAsync,
  addToWishlistAsync,
  removeFromWishlistAsync,
  selectWishlistItemById,
} from '../app/slices/wishlistSlice';
import { selectLoggedInUser } from '../app/slices/userSlice';
import { classNames } from '../services';
import ButtonLoader from '../components/ButtonLoader';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const status = useSelector(state => state.product.selectedProductStatus);
  const product = useSelector(state => state.product.selectedProduct);
  const error = useSelector(state => state.product.selectedProductError);
  const cartItem = useSelector(state => selectCartItemById(state, Number(id)));
  const wishlistItem = useSelector(state => selectWishlistItemById(state, Number(id)));
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  const [addToCartStatus, setAddToCartStatus] = useState('idle');
  const [addToWishlistStatus, setAddToWishlistStatus] = useState('idle');
  const [itemAdded, setItemAdded] = useState(false);

  useEffect(() => {
    dispatch(fetchProductByIdAsync(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      dispatch(fetchWishlistAsync(user.id));
      dispatch(fetchCartAsync(user.id));
    }
  }, [dispatch, user]);

  const handleAddToCart = async () => {
    try {
      setAddToCartStatus('pending');

      if (cartItem) {
        await dispatch(
          updateQuantityAsync({
            id: cartItem.id,
            quantity: cartItem.quantity + 1,
          })
        ).unwrap();
      } else {
        await dispatch(addToCartAsync({ product, quantity: 1, userId: user.id })).unwrap();
      }

      setItemAdded(true);
    } catch (error) {
      console.log(error);
    } finally {
      setAddToCartStatus('idle');
    }
  };

  const handleAddToWishlist = async () => {
    try {
      setAddToWishlistStatus('pending');

      if (wishlistItem) {
        await dispatch(removeFromWishlistAsync(wishlistItem.id)).unwrap();
      } else {
        await dispatch(addToWishlistAsync({ product, userId: user.id })).unwrap();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAddToWishlistStatus('idle');
    }
  };

  const handleClick = () => (itemAdded ? navigate('/cart') : handleAddToCart());

  if (user?.role === 'admin') {
    return <Navigate to='/admin/products' replace={true} />;
  }

  if (status === 'idle' || status === 'loading') {
    return <LoadingSpinner />;
  }

  if (error) {
    throw error;
  }

  return (
    <main className='page-height px-20 py-10 grid grid-cols-2 gap-10'>
      <section className='h-[500px] border border-gray-200 rounded-xl overflow-hidden bg-slate-50'>
        <img
          className='w-full h-full object-cover object-center'
          src={product.thumbnail}
          alt={product.title}
        />
      </section>

      <section className='space-y-7'>
        <div>
          <div className='flex justify-between items-end gap-6'>
            <h1 className='text-2xl'>{product.title}</h1>

            <button
              className={classNames('text-2xl', wishlistItem ? 'text-indigo-500' : 'text-gray-400')}
              onClick={() =>
                user ? handleAddToWishlist() : navigate(`/login?redirectTo=/products/${id}`)
              }
              disabled={addToWishlistStatus === 'pending'}
            >
              {wishlistItem ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>

          <h2 className='mt-2 text-xl'>₹{product.price}</h2>

          <div className='mt-3 flex gap-1'>
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                className={classNames(
                  'text-lg',
                  index < product.rating ? 'text-indigo-500' : 'text-gray-300'
                )}
                key={index}
              >
                <FaStar />
              </span>
            ))}
          </div>
        </div>

        <p>{product.description}</p>

        <button
          className={classNames(
            'w-72 h-12 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 flex justify-center items-center',
            addToCartStatus === 'pending' ? 'cursor-wait' : ''
          )}
          onClick={() => (user ? handleClick() : navigate(`/login?redirectTo=/products/${id}`))}
          disabled={addToCartStatus === 'pending'}
        >
          {itemAdded ? (
            <span className='flex items-center gap-3'>
              Go to cart
              <FaArrowRight className='relative top-px' />
            </span>
          ) : addToCartStatus === 'pending' ? (
            <ButtonLoader />
          ) : (
            'Add to cart'
          )}
        </button>
      </section>
    </main>
  );
};

export default ProductDetails;
