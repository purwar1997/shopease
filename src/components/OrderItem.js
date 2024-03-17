import { useState } from 'react';
import { BsTrash3Fill } from 'react-icons/bs';

const OrderItem = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <li className='p-6 flex gap-5'>
      <div className='w-28 h-28 border border-gray-200 rounded-lg overflow-hidden'>
        <img
          className='w-full h-full object-cover object-center'
          src={product.imageSrc}
          alt={product.imageAlt}
        />
      </div>

      <div className='flex-1 flex flex-col justify-between'>
        <div className='flex justify-between items-start'>
          <div>
            <h3>{product.name}</h3>
            <p className='mt-0.5 text-sm text-gray-500'>{product.color}</p>
          </div>

          <button className='text-gray-400 text-lg hover:text-gray-500'>
            <BsTrash3Fill />
          </button>
        </div>

        <div className='flex justify-between items-end'>
          <p>{product.price}</p>

          <select
            className='pl-2.5 pr-8 py-1 ring-1 ring-gray-300 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer'
            id='quantity'
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
          >
            {[...new Array(10)].map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
    </li>
  );
};

export default OrderItem;
