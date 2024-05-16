import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAsync } from '../app/slices/productSlice';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';

const AdminProductGrid = ({ filters, pagination }) => {
  const status = useSelector(state => state.product.status);
  const products = useSelector(state => state.product.products);
  const error = useSelector(state => state.product.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsAsync({ filters, pagination }));
  }, [dispatch, filters, pagination]);

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
          <ProductCard key={product.id} product={product} otherProps={{ filters, pagination }} />
        ))}
      </ul>
    </section>
  );
};

export default AdminProductGrid;
