import { useState } from 'react';

const CartItem = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <li className='py-7 flex gap-6'>
      <div className='w-36 h-36 border border-gray-200 rounded-lg overflow-hidden'>
        <img
          className='w-full h-full object-cover object-center'
          src={product.imageSrc}
          alt={product.imageAlt}
        />
      </div>

      <div className='flex-1 flex flex-col justify-between'>
        <div className='flex justify-between'>
          <div>
            <h3 className='text-lg'>{product.name}</h3>
            <p className='mt-px text-gray-400'>{product.color}</p>
          </div>

          <p className='text-lg font-medium'>{product.price}</p>
        </div>

        <div className='flex justify-between items-center'>
          <select
            className='pl-2.5 pr-8 py-1 ring-1 ring-gray-300 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer'
            id='quantity'
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>

          <button className='text-indigo-500 font-medium'>Remove</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
