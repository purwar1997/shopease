import { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateQuantityAsync,
  removeFromCartAsync,
  moveToWishlistAsync,
} from '../app/slices/cartSlice';
import { addToWishlist, selectWishlistItemById } from '../app/slices/wishlistSlice';
import { selectLoggedInUser } from '../app/slices/userSlice';

const CartItem = memo(({ id, product, quantity }) => {
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const [removeStatus, setRemoveStatus] = useState('idle');
  const [moveStatus, setMoveStatus] = useState('idle');

  const user = useSelector(selectLoggedInUser);
  const itemPresentInWishlist = useSelector(state => selectWishlistItemById(state, product.id));
  const dispatch = useDispatch();

  const handleUpdateQuantity = async e => {
    setItemQuantity(e.target.value);

    try {
      await dispatch(updateQuantityAsync({ id, quantity: Number(e.target.value) })).unwrap();
    } catch (error) {
      setItemQuantity(quantity);
      console.log(error);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      setRemoveStatus('pending');
      await dispatch(removeFromCartAsync(id)).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setRemoveStatus('idle');
    }
  };

  const handleMoveToWishlist = async () => {
    try {
      setMoveStatus('pending');
      const data = await dispatch(moveToWishlistAsync({ id, product, userId: user.id })).unwrap();

      if (!itemPresentInWishlist) {
        dispatch(addToWishlist(data.wishlistItem));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMoveStatus('idle');
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

          <div className='flex gap-6'>
            <button
              className='text-indigo-500 font-medium'
              onClick={handleRemoveFromCart}
              disabled={removeStatus === 'pending'}
            >
              Remove
            </button>

            <button
              className='text-indigo-500 font-medium'
              onClick={handleMoveToWishlist}
              disabled={moveStatus === 'pending'}
            >
              Move to wishlist
            </button>
          </div>
        </div>
      </div>
    </li>
  );
});

export default CartItem;
