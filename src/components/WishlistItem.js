import { useState, memo } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromWishlistAsync, moveToCartAsync } from '../app/slices/wishlistSlice';

const WishlistItem = memo(({ id, product, userId }) => {
  const [removeStatus, setRemoveStatus] = useState('idle');
  const [moveStatus, setMoveStatus] = useState('idle');

  const dispatch = useDispatch();

  const handleRemoveFromWishlist = async () => {
    try {
      setRemoveStatus('pending');
      await dispatch(removeFromWishlistAsync(id)).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setRemoveStatus('idle');
    }
  };

  const handleMoveToCart = async () => {
    try {
      setMoveStatus('pending');
      await dispatch(moveToCartAsync({ id, product, userId })).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setMoveStatus('idle');
    }
  };

  return (
    <li className='py-7 flex gap-5'>
      <div className='w-36 h-36 border border-gray-200 rounded-lg overflow-hidden'>
        <img
          className='w-full h-full object-cover object-center'
          src={product.thumbnail}
          alt={product.name}
        />
      </div>

      <div className='flex-1 flex flex-col justify-between'>
        <div className='flex justify-between items-start'>
          <div>
            <h2 className='text-lg'>{product.title}</h2>
            <p className='mt-px text-gray-400'>{product.brand}</p>
          </div>

          <p className='text-lg font-medium'>₹{product.price}</p>
        </div>

        <div className='flex justify-end gap-7 *:text-indigo-500 *:font-medium'>
          <button onClick={handleRemoveFromWishlist} disabled={removeStatus === 'pending'}>
            Remove
          </button>

          <button onClick={handleMoveToCart} disabled={moveStatus === 'pending'}>
            Move to cart
          </button>
        </div>
      </div>
    </li>
  );
});

export default WishlistItem;
