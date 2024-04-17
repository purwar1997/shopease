import { useState, useRef, memo } from 'react';
import { useDispatch } from 'react-redux';
import { updateItemQuantity, removeItemFromCart } from '../app/slices/cartSlice';
import { classNames } from '../utils/helpers';

const CartItem = memo(({ id, product, quantity }) => {
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const [removeFromCartStatus, setRemoveFromCartStatus] = useState('idle');
  const quantityRef = useRef(quantity);

  const dispatch = useDispatch();

  const handleUpdateQuantity = async e => {
    setItemQuantity(e.target.value);

    try {
      await dispatch(updateItemQuantity({ id, quantity: Number(e.target.value) })).unwrap();
    } catch (error) {
      setItemQuantity(quantityRef.current);
      console.log(error);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      setRemoveFromCartStatus('pending');
      await dispatch(removeItemFromCart(id)).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setRemoveFromCartStatus('idle');
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
        <div className='flex justify-between'>
          <div>
            <h3 className='text-lg'>{product.title}</h3>
            <p className='mt-px text-gray-400'>{product.brand}</p>
          </div>

          <p className='text-lg font-medium'>₹{product.price * itemQuantity}</p>
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
            className={classNames(
              'text-indigo-500 font-medium',
              removeFromCartStatus === 'pending' ? 'cursor-wait' : ''
            )}
            onClick={handleRemoveFromCart}
            disabled={removeFromCartStatus === 'pending'}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
});

export default CartItem;
