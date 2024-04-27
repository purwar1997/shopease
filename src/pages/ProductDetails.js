import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaStar, FaHeart, FaRegHeart, FaArrowRight } from 'react-icons/fa6';
import { fetchProductByIdAsync } from '../app/slices/productSlice';
import { addToCartAsync, updateQuantityAsync, selectCartItemById } from '../app/slices/cartSlice';
import {
  fetchWishlistAsync,
  addToWishlistAsync,
  removeFromWishlistAsync,
  selectWishlistItemById,
} from '../app/slices/wishlistSlice';
import { selectLoggedInUser } from '../app/slices/userSlice';
import { classNames } from '../utils/helpers';
import ButtonLoader from '../components/ButtonLoader';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const status = useSelector(state => state.product.selectedProductStatus);
  const product = useSelector(state => state.product.selectedProduct);
  const error = useSelector(state => state.product.selectedProductError);
  const itemPresentInCart = useSelector(state => selectCartItemById(state, Number(id)));
  const itemPresentInWishlist = useSelector(state => selectWishlistItemById(state, Number(id)));
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  const [addToCartStatus, setAddToCartStatus] = useState('idle');
  const [addToWishlistStatus, setAddToWishlistStatus] = useState('idle');
  const [itemAdded, setItemAdded] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(fetchWishlistAsync(user.id));
    }

    dispatch(fetchProductByIdAsync(id));
  }, [dispatch, user, id]);

  const handleAddToCart = async () => {
    try {
      setAddToCartStatus('pending');

      if (itemPresentInCart) {
        await dispatch(
          updateQuantityAsync({
            id: itemPresentInCart.id,
            quantity: itemPresentInCart.quantity + 1,
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

      if (itemPresentInWishlist) {
        await dispatch(removeFromWishlistAsync(itemPresentInWishlist.id)).unwrap();
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

  if (status === 'idle' || status === 'loading') {
    return <LoadingSpinner />;
  }

  if (error) {
    return <h2>{error.message}</h2>;
  }

  return (
    <main className='page-height px-20 py-10 grid grid-cols-2 gap-10'>
      <section className='border border-gray-200 rounded-xl overflow-hidden'>
        <img className='object-cover object-center' src={product.thumbnail} alt={product.title} />
      </section>

      <section className='space-y-8'>
        <div>
          <div className='flex justify-between items-center'>
            <h1 className='text-3xl'>{product.title}</h1>

            <button
              className={classNames(
                'text-2xl',
                itemPresentInWishlist ? 'text-indigo-500' : 'text-gray-400'
              )}
              onClick={handleAddToWishlist}
              disabled={addToWishlistStatus === 'pending'}
            >
              {itemPresentInWishlist ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>

          <h2 className='mt-1.5 text-2xl'>₹{product.price}</h2>

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
          onClick={handleClick}
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
