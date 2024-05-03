import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategoriesAsync, fetchBrandsAsync } from '../app/slices/productSlice';
import { ITEMS_PER_PAGE } from '../utils/constants';
import AdminProductGrid from '../components/AdminProductGrid';
import FilterAccordian from '../components/FilterAccordian';
import Pagination from '../components/Pagination';

const AdminProducts = () => {
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({ page: 1, limit: ITEMS_PER_PAGE });

  const brands = useSelector(state => state.product.brands);
  const categories = useSelector(state => state.product.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  const filterOptions = [
    { id: 'category', name: 'Categories', options: categories },
    { id: 'brand', name: 'Brand', options: brands },
    { id: 'rating', name: 'Rating', options: [4, 3, 2, 1] },
  ];

  return (
    <main className='page-height px-12 py-10'>
      <header className='flex justify-between items-center border-b border-gray-200 pb-5'>
        <h1 className='text-3xl'>All Products</h1>

        <Link
          className='px-4 py-2 border border-gray-300 text-gray-600 shadow-sm rounded-md hover:bg-gray-50'
          to='add'
        >
          Add product
        </Link>
      </header>

      <div className='mt-8 flex items-start'>
        <aside className='pr-8'>
          {filterOptions.map(option => (
            <FilterAccordian
              key={option.id}
              filterOption={option}
              filters={filters}
              setFilters={setFilters}
              pagination={pagination}
              setPagination={setPagination}
            />
          ))}
        </aside>

        <AdminProductGrid filters={filters} pagination={pagination} />
      </div>

      <Pagination pagination={pagination} setPagination={setPagination} />
    </main>
  );
};

export default AdminProducts;
