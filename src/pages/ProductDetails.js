import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaStar } from 'react-icons/fa6';
import { fetchProductById } from '../app/slices/productSlice';
import { addItemToCart, updateItemQuantity } from '../app/slices/cartSlice';
import { classNames } from '../utils/helpers';
import ButtonLoader from '../components/ButtonLoader';

const ProductDetails = () => {
  const { id } = useParams();

  const status = useSelector(state => state.products.selectedProductStatus);
  const product = useSelector(state => state.products.selectedProduct);
  const error = useSelector(state => state.products.selectedProductError);
  const cartItem = useSelector(state =>
    state.cart.cartItems.find(item => item.product.id === product.id)
  );

  const dispatch = useDispatch();

  const [addToCartStatus, setAddToCartStatus] = useState('idle');

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id]);

  const handleAddItemToCart = async () => {
    try {
      setAddToCartStatus('pending');

      if (cartItem) {
        await dispatch(
          updateItemQuantity({ id: cartItem.id, quantity: cartItem.quantity + 1 })
        ).unwrap();
      } else {
        await dispatch(addItemToCart(product)).unwrap();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAddToCartStatus('idle');
    }
  };

  if (status === 'idle' || status === 'loading') {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error.message}</h2>;
  }

  return (
    <section className='grid grid-cols-2 gap-10'>
      <div className='border border-gray-200 rounded-xl overflow-hidden'>
        <img className='object-cover object-center' src={product.thumbnail} alt={product.title} />
      </div>

      <div className='space-y-8'>
        <div>
          <h1 className='text-3xl'>{product.title}</h1>
          <h2 className='mt-1.5 text-2xl'>₹{product.price}</h2>
          <div className='mt-3 flex gap-1'>
            {[...new Array(5)].map((_, index) => (
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
            'w-80 h-12 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 flex justify-center items-center',
            addToCartStatus === 'pending' ? 'cursor-wait' : ''
          )}
          onClick={handleAddItemToCart}
          disabled={addToCartStatus === 'pending'}
        >
          {addToCartStatus === 'pending' ? <ButtonLoader /> : 'Add to cart'}
        </button>
      </div>
    </section>
  );
};

export default ProductDetails;
