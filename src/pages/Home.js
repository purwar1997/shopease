import { useState, useEffect, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import ProductList from '../components/ProductList';
import FilterAccordian from '../components/FilterAccordian';
import Pagination from '../components/Pagination';
import { categories, brands } from '../filters';

const sortOptions = [
  { name: 'Best Rating' },
  { name: 'Newest' },
  { name: 'Price: Low to High' },
  { name: 'Price: High to Low' },
];

const filters = [
  {
    id: 'brand',
    name: 'Brand',
    options: brands,
  },
  {
    id: 'category',
    name: 'Category',
    options: categories,
  },
  {
    id: 'rating',
    name: 'Rating',
    options: [4, 3, 2, 1],
  },
];

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sortMenuRef = useRef(null);

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
                  className='list-none cursor-pointer px-4 py-2 text-sm hover:bg-gray-100'
                  onClick={() => setIsOpen(false)}
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
          {filters.map(filter => (
            <FilterAccordian key={filter.id} filter={filter} />
          ))}
        </aside>

        <div className='pl-8 border-l border-gray-200'>
          <ProductList />
        </div>
      </section>

      <Pagination />
    </>
  );
};

export default Home;
