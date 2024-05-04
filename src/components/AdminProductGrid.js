import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { fetchProductsByFilterAsync, deleteProductAsync } from '../app/slices/productSlice';
import LoadingSpinner from './LoadingSpinner';

const AdminProductGrid = ({ filters, pagination }) => {
  const [deleteStatus, setDeleteStatus] = useState('idle');

  const status = useSelector(state => state.product.status);
  const products = useSelector(state => state.product.products);
  const error = useSelector(state => state.product.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsByFilterAsync({ filters, sort: null, pagination }));
  }, [dispatch, filters, pagination]);

  const handleDeleteProduct = async id => {
    try {
      setDeleteStatus('pending');
      await dispatch(deleteProductAsync(id)).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteStatus('idle');
    }
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (error) {
    throw error;
  }

  return (
    <section className='pl-8 border-l border-gray-200 grid grid-cols-3 gap-x-8 gap-y-10'>
      {products.map(product => (
        <div className='w-80 border rounded shadow-sm'>
          <div className='w-full h-56 overflow-hidden rounded-t bg-gray-100'>
            <img
              className='object-cover object-center'
              src={product.thumbnail}
              alt={product.title}
            />
          </div>

          <div className='px-3 pt-3 pb-2.5'>
            <div className='flex justify-between gap-8'>
              <h3 className='truncate'>{product.title}</h3>
              <p className='font-medium'>₹{product.price}</p>
            </div>

            <p className='mt-1.5 flex items-center gap-2'>
              <FaStar className='text-yellow-500' />
              <span>{Math.round(product.rating * 10) / 10}</span>
            </p>
          </div>

          <div className='flex border-t'>
            <div className='py-2 flex-1 flex justify-center border-r'>
              <Link className='text-sm text-indigo-700' to={`${product.id}/edit`}>
                Edit
              </Link>
            </div>

            <div className='py-2 flex-1 flex justify-center'>
              <button
                className='text-sm text-indigo-700'
                onClick={() => handleDeleteProduct(product.id)}
                disabled={deleteStatus === 'pending'}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default AdminProductGrid;
