import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaChevronDown } from 'react-icons/fa6';
import ProductList from '../components/ProductList';
import FilterAccordian from '../components/FilterAccordian';
import Pagination from '../components/Pagination';
import { fetchProductsByFilter, fetchCategories, fetchBrands } from '../app/slices/productSlice';
import { classNames } from '../utils/helpers';
import { ITEMS_PER_PAGE } from '../utils/constants';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [sort, setSortOption] = useState({});
  const [pagination, setPagination] = useState({ page: 1, limit: ITEMS_PER_PAGE });
  const sortMenuRef = useRef(null);

  const categories = useSelector(state => state.products.categories);
  const brands = useSelector(state => state.products.brands);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands());
  }, []);

  useEffect(() => {
    const handleClickOutside = event => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSort = sortOption => {
    dispatch(fetchProductsByFilter({ filters, sort: sortOption, pagination }));
    setSortOption(sortOption);
    setIsOpen(false);
  };

  const filterOptions = [
    { id: 'brand', name: 'Brand', options: brands },
    { id: 'category', name: 'Category', options: categories },
    { id: 'rating', name: 'Rating', options: [4, 3, 2, 1] },
  ];

  const sortOptions = [
    { name: 'Customer Rating', sortBy: 'rating', order: 'desc' },
    { name: 'Newly Added', sortBy: 'date', order: 'desc' },
    { name: 'Price: Low to High', sortBy: 'price', order: 'asc' },
    { name: 'Price: High to Low', sortBy: 'price', order: 'desc' },
  ];

  return (
    <>
      <header className='flex justify-between items-center border-b border-gray-200 pb-5'>
        <h2 className='text-3xl'>All Products</h2>

        <div className='relative' ref={sortMenuRef}>
          <span
            className='flex items-center gap-3 cursor-pointer group'
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className='font-medium text-gray-500'>Sort</span>
            <FaChevronDown className='relative top-px text-xs text-gray-400 group-hover:text-gray-600' />
          </span>

          {isOpen && (
            <div className='absolute right-0 top-8 w-44 bg-white shadow-lg ring-1 ring-black/10 rounded py-1 z-20'>
              {sortOptions.map(option => (
                <li
                  className={classNames(
                    'list-none cursor-pointer px-4 py-2 text-sm hover:bg-gray-100',
                    option.name === sort.name ? 'font-medium text-gray-800' : ''
                  )}
                  onClick={() => handleSort(option)}
                  key={option.name}
                >
                  {option.name}
                </li>
              ))}
            </div>
          )}
        </div>
      </header>

      <section className='mt-8 flex items-start'>
        <aside className='pr-8'>
          {filterOptions.map(option => (
            <FilterAccordian
              key={option.id}
              filterOption={option}
              filters={filters}
              setFilters={setFilters}
              sort={sort}
              pagination={pagination}
              setPagination={setPagination}
            />
          ))}
        </aside>

        <div className='pl-8 border-l border-gray-200'>
          <ProductList filters={filters} sort={sort} pagination={pagination} />
        </div>
      </section>

      <Pagination
        pagination={pagination}
        setPagination={setPagination}
        filters={filters}
        sort={sort}
      />
    </>
  );
};

export default Home;
