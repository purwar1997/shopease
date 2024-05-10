import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaChevronDown } from 'react-icons/fa6';
import { fetchCategoriesAsync, fetchBrandsAsync } from '../app/slices/productSlice';
import { useHandleDropdown } from '../utils/customHooks';
import { classNames } from '../utils/helpers';
import { PRODUCTS_PER_PAGE } from '../utils/constants';
import ProductGrid from '../components/ProductGrid';
import FilterAccordian from '../components/FilterAccordian';
import Pagination from '../components/Pagination';

const sortOptions = [
  { name: 'Customer Rating', sortBy: 'rating', order: 'desc' },
  { name: 'Newly Added', sortBy: 'date', order: 'desc' },
  { name: 'Price: Low to High', sortBy: 'price', order: 'asc' },
  { name: 'Price: High to Low', sortBy: 'price', order: 'desc' },
];

const Home = () => {
  const [openSortMenu, setOpenSortMenu] = useState(false);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({});
  const [pagination, setPagination] = useState({ page: 1, limit: PRODUCTS_PER_PAGE });
  const sortMenuRef = useRef(null);

  const brands = useSelector(state => state.product.brands);
  const categories = useSelector(state => state.product.categories);
  const productCount = useSelector(state => state.product.productCount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  useHandleDropdown(sortMenuRef, setOpenSortMenu);

  const toggleSortMenu = () => setOpenSortMenu(!openSortMenu);

  const handleSort = sortOption => {
    setSort(sortOption);
    toggleSortMenu();
  };

  const filterOptions = [
    { id: 'category', name: 'Categories', options: categories },
    { id: 'brand', name: 'Brand', options: brands },
    { id: 'rating', name: 'Rating', options: [4, 3, 2, 1] },
  ];

  return (
    <main className='page-height px-12 py-10 flex flex-col'>
      <header className='flex justify-between items-center border-b border-gray-200 pb-5'>
        <h1 className='text-3xl'>All Products</h1>

        <div className='relative' ref={sortMenuRef}>
          <span className='flex items-center gap-3 cursor-pointer group' onClick={toggleSortMenu}>
            <span className='font-medium text-gray-500'>Sort</span>
            <FaChevronDown className='relative top-px text-xs text-gray-400 group-hover:text-gray-600' />
          </span>

          {openSortMenu && (
            <ul className='absolute right-0 top-8 w-44 bg-white shadow-lg ring-1 ring-black/10 rounded py-1 z-20'>
              {sortOptions.map(option => (
                <li
                  className={classNames(
                    'list-none cursor-pointer px-4 py-2 text-sm hover:bg-gray-100',
                    option.name === sort.name ? 'font-medium text-gray-600' : ''
                  )}
                  onClick={() => handleSort(option)}
                  key={option.name}
                >
                  {option.name}
                </li>
              ))}
            </ul>
          )}
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

        <ProductGrid filters={filters} sort={sort} pagination={pagination} />
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

export default Home;
