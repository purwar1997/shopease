import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import { fetchCategoriesAsync, fetchBrandsAsync } from '../app/slices/productSlice';
import { PRODUCTS_PER_PAGE } from '../utils/constants';
import AdminProductGrid from '../components/AdminProductGrid';
import FilterAccordian from '../components/FilterAccordian';
import Pagination from '../components/Pagination';

const AdminProducts = () => {
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({ page: 1, limit: PRODUCTS_PER_PAGE });

  const brands = useSelector(state => state.product.brands);
  const categories = useSelector(state => state.product.categories);
  const productCount = useSelector(state => state.product.productCount);
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
    <main className='page-height px-12 py-10 flex flex-col'>
      <header className='flex justify-between items-end border-b border-gray-200 pb-5'>
        <h1 className='text-3xl'>All Products</h1>

        <Link
          className='font-medium text-indigo-500 hover:text-indigo-600 flex items-center gap-2'
          to='add'
        >
          <FaPlus />
          <span>Add product</span>
        </Link>
      </header>

      <div className='mt-8 flex-1 flex items-start'>
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

      <Pagination
        pagination={pagination}
        setPagination={setPagination}
        itemsPerPage={PRODUCTS_PER_PAGE}
        totalCount={productCount}
      />
    </main>
  );
};

export default AdminProducts;
