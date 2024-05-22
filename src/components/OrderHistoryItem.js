import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaCircleCheck } from 'react-icons/fa6';
import { addToCartAsync, updateQuantityAsync, selectCartItemById } from '../app/slices/cartSlice';
import { formatDate } from '../services';

const OrderHistoryItem = ({ orderItem, orderStatus, date, userId }) => {
  const { id, title, price, description, thumbnail } = orderItem.product;

  const [status, setStatus] = useState('idle');
  
  const itemPresentInCart = useSelector(state => selectCartItemById(state, id));
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    try {
      setStatus('pending');

      if (itemPresentInCart) {
        await dispatch(
          updateQuantityAsync({
            id: itemPresentInCart.id,
            quantity: itemPresentInCart.quantity + 1,
          })
        ).unwrap();
      } else {
        await dispatch(
          addToCartAsync({ product: orderItem.product, quantity: 1, userId })
        ).unwrap();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setStatus('idle');
    }
  };

  const getOrderUpdate = () => {
    const dateString = formatDate(date, 'long');

    switch (orderStatus) {
      case 'created':
        return 'Order has been placed';
      case 'processing':
        return 'Order is being processed';
      case 'shipped':
        return 'Out for delivery';
      case 'delivered':
        return `Delivered on ${dateString}`;
      default:
        return '';
    }
  };

  return (
    <li className='p-6'>
      <div className='flex gap-5'>
        <div className='w-36 h-36 border border-gray-200 rounded-lg overflow-hidden'>
          <img className='w-full h-full object-cover object-center' src={thumbnail} alt={title} />
        </div>

        <div className='flex-1'>
          <div className='flex justify-between'>
            <h3>{title}</h3>
            <p className='font-medium text-gray-600'>₹{price}</p>
          </div>

          <p className='mt-2'>{description}</p>
        </div>
      </div>

      <div className='mt-6 flex justify-between items-center'>
        <p className='flex items-center gap-2.5'>
          {orderStatus === 'delivered' && <FaCircleCheck className='text-green-500' />}
          <span className='font-medium text-gray-600'>{getOrderUpdate()}</span>
        </p>

        <div className='space-x-8 *:text-indigo-500 *:font-medium'>
          <Link to={`/products/${id}`}>View product</Link>

          <button onClick={handleAddToCart} disabled={status === 'pending'}>
            Buy again
          </button>
        </div>
      </div>
    </li>
  );
};

export default OrderHistoryItem;
