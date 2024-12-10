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
      <ul className='grid grid-cols-3 gap-10'>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`products/${product.id}`}>
              <div className='w-80 p-2.5 rounded-md hover:ring-1 hover:ring-gray-200 hover:shadow-lg'>
                <div className='w-full h-56 overflow-hidden rounded-md bg-slate-100'>
                  <img
                    className='w-full h-full object-cover object-top'
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
