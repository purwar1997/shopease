import { useState, useEffect, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import ProductList from '../components/ProductList';
import FilterAccordian from '../components/FilterAccordian';
import Pagination from '../components/Pagination';

const sortOptions = [
  { name: 'Best Rating' },
  { name: 'Newest' },
  { name: 'Price: Low to High' },
  { name: 'Price: High to Low' },
];

const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White' },
      { value: 'beige', label: 'Beige' },
      { value: 'blue', label: 'Blue' },
      { value: 'brown', label: 'Brown' },
      { value: 'green', label: 'Green' },
      { value: 'purple', label: 'Purple' },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals' },
      { value: 'sale', label: 'Sale' },
      { value: 'travel', label: 'Travel' },
      { value: 'organization', label: 'Organization' },
      { value: 'accessories', label: 'Accessories' },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L' },
      { value: '6l', label: '6L' },
      { value: '12l', label: '12L' },
      { value: '18l', label: '18L' },
      { value: '20l', label: '20L' },
      { value: '40l', label: '40L' },
    ],
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
        <h2 className='text-3xl'>All Home</h2>

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
