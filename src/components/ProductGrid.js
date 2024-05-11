import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { fetchProductsAsync } from '../app/slices/productSlice';
import LoadingSpinner from './LoadingSpinner';

const ProductGrid = ({ filters, sort, pagination }) => {
  const status = useSelector(state => state.product.status);
  const products = useSelector(state => state.product.products);
  const error = useSelector(state => state.product.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsAsync({ filters, sort, pagination }));
  }, [dispatch, filters, sort, pagination]);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (error) {
    throw error;
  }

  return (
    <section className='pl-8 border-l border-gray-200'>
      <ul className='grid grid-cols-3 gap-x-8 gap-y-10'>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`products/${product.id}`}>
              <div className='group'>
                <div className='w-80 h-56 overflow-hidden rounded bg-gray-100'>
                  <img
                    className='object-cover object-center group-hover:opacity-80'
                    src={product.thumbnail}
                    alt={product.title}
                  />
                </div>

                <div className='mt-3.5'>
                  <div className='flex justify-between gap-8'>
                    <h3 className='truncate'>{product.title}</h3>
                    <p className='font-medium'>₹{product.price}</p>
                  </div>

                  <p className='mt-1 flex items-center gap-2'>
                    <FaStar className='text-yellow-500' />
                    <span>{Math.round(product.rating * 10) / 10}</span>
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductGrid;
