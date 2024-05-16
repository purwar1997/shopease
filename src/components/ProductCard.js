import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa6';
import DeleteProductModal from './DeleteProductModal';

const ProductCard = ({ product, otherProps }) => {
  const { id, title, price, rating, thumbnail } = product;

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

  return (
    <li className='w-80 border rounded-md shadow-sm'>
      <div className='w-full h-56 overflow-hidden rounded-t-md bg-gray-100'>
        <img className='object-cover object-center' src={thumbnail} alt={title} />
      </div>

      <div className='px-3 pt-3 pb-2.5'>
        <div className='flex justify-between gap-8'>
          <h3 className='truncate'>{title}</h3>
          <p className='font-medium'>₹{price}</p>
        </div>

        <p className='mt-1.5 flex items-center gap-2'>
          <FaStar className='text-yellow-500' />
          <span>{Math.round(rating * 10) / 10}</span>
        </p>
      </div>

      <div className='flex border-t'>
        <div className='py-2 flex-1 flex justify-center border-r'>
          <Link className='text-sm text-indigo-700' to={`${id}/edit`}>
            Edit
          </Link>
        </div>

        <div className='py-2 flex-1 flex justify-center'>
          <button
            className='text-sm text-indigo-700 focus-visible:outline-none'
            onClick={toggleDeleteModal}
          >
            Delete
          </button>
        </div>
      </div>

      {openDeleteModal && (
        <DeleteProductModal closeModal={toggleDeleteModal} productId={id} otherProps={otherProps} />
      )}
    </li>
  );
};

export default ProductCard;
