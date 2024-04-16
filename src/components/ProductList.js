import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { fetchProductsByFilter } from '../app/slices/productSlice';

const ProductList = ({ filters, sort, pagination }) => {
  const status = useSelector(state => state.products.status);
  const products = useSelector(state => state.products.products);
  const error = useSelector(state => state.products.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsByFilter({ filters, sort, pagination }));
  }, [filters, sort, pagination]);

  if (status === 'loading') {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className='grid grid-cols-3 gap-x-8 gap-y-10'>
      {products.map(product => (
        <Link key={product.id} to={`products/${product.id}`}>
          <div className='group'>
            <div className='w-80 h-56 overflow-hidden rounded bg-gray-100'>
              <img
                className='object-cover object-center group-hover:opacity-80'
                src={product.thumbnail}
                alt={product.title}
              />
            </div>

            <div className='mt-4 flex justify-between'>
              <div>
                <h3>{product.title}</h3>

                <p className='mt-1 flex items-center gap-2'>
                  <FaStar className='text-yellow-500' />
                  <span>{Math.round(product.rating * 10) / 10}</span>
                </p>
              </div>

              <p className='font-medium'>₹{product.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
