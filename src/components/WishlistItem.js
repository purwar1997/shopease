import { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishlistAsync, moveToCartAsync } from '../app/slices/wishlistSlice';
import { selectLoggedInUser } from '../app/slices/userSlice';
import { selectCartItemById, addToCart, updateQuantity } from '../app/slices/cartSlice';

const WishlistItem = memo(({ id, product }) => {
  const { id: productId, title, price, brand, thumbnail } = product;

  const [removeStatus, setRemoveStatus] = useState('idle');
  const [moveStatus, setMoveStatus] = useState('idle');

  const user = useSelector(selectLoggedInUser);
  const cartItem = useSelector(state => selectCartItemById(state, productId));
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
      const data = await dispatch(moveToCartAsync({ id, product, userId: user.id })).unwrap();

      if (cartItem) {
        dispatch(updateQuantity(data.cartItem));
      } else {
        dispatch(addToCart(data.cartItem));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMoveStatus('idle');
    }
  };

  return (
    <li className='py-7 flex gap-5'>
      <Link to={`/products/${productId}`}>
        <div className='w-36 h-36 border border-gray-200 rounded-lg overflow-hidden bg-slate-50'>
          <img className='w-full h-full object-cover object-center' src={thumbnail} alt={title} />
        </div>
      </Link>

      <div className='flex-1 flex flex-col justify-between'>
        <div className='flex justify-between items-start'>
          <div>
            <Link to={`/products/${productId}`}>
              <h2 className='text-lg'>{title}</h2>
            </Link>

            <p className='mt-px text-gray-400'>{brand}</p>
          </div>

          <p className='text-lg font-medium'>₹{price}</p>
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
