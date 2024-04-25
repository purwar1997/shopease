import { useState, useRef, memo } from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantityAsync, removeFromCartAsync } from '../app/slices/cartSlice';

const CartItem = memo(({ id, product, quantity }) => {
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const [status, setStatus] = useState('idle');
  const quantityRef = useRef(quantity);

  const dispatch = useDispatch();

  const handleUpdateQuantity = async e => {
    setItemQuantity(e.target.value);

    try {
      await dispatch(updateQuantityAsync({ id, quantity: Number(e.target.value) })).unwrap();
    } catch (error) {
      setItemQuantity(quantityRef.current);
      console.log(error);
    }
  };

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

  return (
    <li className='py-7 flex gap-6'>
      <div className='w-36 h-36 border border-gray-200 rounded-lg overflow-hidden'>
        <img
          className='w-full h-full object-cover object-center'
          src={product.thumbnail}
          alt={product.title}
        />
      </div>

      <div className='flex-1 flex flex-col justify-between'>
        <div className='flex justify-between items-start'>
          <div>
            <h2 className='text-lg'>{product.title}</h2>
            <p className='mt-px text-gray-400'>{product.brand}</p>
          </div>

          <p className='text-lg font-medium'>₹{product.price * quantity}</p>
        </div>

        <div className='flex justify-between items-center'>
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

          <button
            className='text-indigo-500 font-medium'
            onClick={handleRemoveFromCart}
            disabled={status === 'pending'}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
});

export default CartItem;
