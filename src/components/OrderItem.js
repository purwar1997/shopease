import { useState, memo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsTrash3Fill } from 'react-icons/bs';
import { removeFromCartAsync, updateQuantityAsync } from '../app/slices/cartSlice';

const OrderItem = memo(({ id, product, quantity }) => {
  const { id: productId, title, price, brand, thumbnail } = product;

  const [itemQuantity, setItemQuantity] = useState(quantity);
  const [status, setStatus] = useState('idle');

  const dispatch = useDispatch();

  const handleRemoveFromCart = async () => {
    try {
      setStatus('pending');
      await dispatch(removeFromCartAsync(id)).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setStatus('idle');
    }
  };

  const handleUpdateQuantity = async e => {
    setItemQuantity(e.target.value);

    try {
      await dispatch(updateQuantityAsync({ id, quantity: Number(e.target.value) })).unwrap();
    } catch (error) {
      setItemQuantity(quantity);
      console.log(error);
    }
  };

  return (
    <li className='p-6 flex gap-5'>
      <Link to={`/products/${productId}`}>
        <div className='w-28 h-28 border border-gray-200 rounded-lg overflow-hidden'>
          <img className='w-full h-full object-cover object-center' src={thumbnail} alt={title} />
        </div>
      </Link>

      <div className='flex-1 flex flex-col justify-between'>
        <div className='flex justify-between items-start'>
          <div>
            <Link to={`/products/${productId}`}>
              <h3>{title}</h3>
            </Link>

            <p className='mt-0.5 text-sm text-gray-500'>{brand}</p>
          </div>

          <button
            className='text-lg text-gray-400 hover:text-gray-500'
            title='Remove item'
            onClick={handleRemoveFromCart}
            disabled={status === 'pending'}
          >
            <BsTrash3Fill />
          </button>
        </div>

        <div className='flex justify-between items-end'>
          <p>₹{price * quantity}</p>

          <select
            className='pl-2.5 pr-8 py-1 ring-1 ring-gray-300 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer'
            id='quantity'
            value={itemQuantity}
            onChange={handleUpdateQuantity}
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
    </li>
  );
});

export default OrderItem;
