import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaPlus, FaChevronDown } from 'react-icons/fa6';
import { fetchCategoriesAsync, fetchBrandsAsync } from '../app/slices/productSlice';
import { PAGINATION } from '../utils/constants';
import AdminProductGrid from '../components/AdminProductGrid';
import FilterAccordian from '../components/FilterAccordian';
import SortMenu from '../components/SortMenu';
import Pagination from '../components/Pagination';

const AdminManageProducts = () => {
  const [openSortMenu, setOpenSortMenu] = useState(false);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({});
  const [pagination, setPagination] = useState({ page: 1, limit: PAGINATION.PRODUCTS_PER_PAGE });
  const sortMenuRef = useRef(null);

  const brands = useSelector(state => state.product.brands);
  const categories = useSelector(state => state.product.categories);
  const productCount = useSelector(state => state.product.productCount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  const toggleSortMenu = () => setOpenSortMenu(!openSortMenu);

  const filterOptions = [
    { id: 'category', name: 'Categories', options: categories },
    { id: 'brand', name: 'Brand', options: brands },
    { id: 'rating', name: 'Rating', options: [4, 3, 2, 1] },
  ];

  return (
    <main className='page-height px-12 py-10 flex flex-col'>
      <header className='flex justify-between items-end border-b border-gray-200 pb-5'>
        <h1 className='text-3xl'>Products</h1>

        <div className='flex gap-10'>
          <Link
            className='font-medium text-indigo-500 hover:text-indigo-600 flex items-center gap-2'
            to='add'
          >
            <FaPlus />
            <span>Add product</span>
          </Link>

          <div className='relative' ref={sortMenuRef}>
            <span className='flex items-center gap-3 cursor-pointer group' onClick={toggleSortMenu}>
              <span className='font-medium text-gray-500'>Sort</span>
              <FaChevronDown className='relative top-px text-xs text-gray-400 group-hover:text-gray-600' />
            </span>

            {openSortMenu && (
              <SortMenu
                sort={sort}
                setSort={setSort}
                sortMenuRef={sortMenuRef}
                closeSortMenu={toggleSortMenu}
              />
            )}
          </div>
        </div>
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

        <AdminProductGrid filters={filters} sort={sort} pagination={pagination} />
      </div>

      <Pagination
        pagination={pagination}
        setPagination={setPagination}
        itemsPerPage={PAGINATION.PRODUCTS_PER_PAGE}
        totalCount={productCount}
      />
    </main>
  );
};

export default AdminManageProducts;
