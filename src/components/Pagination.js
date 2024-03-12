import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const Pagination = () => {
  return (
    <div className='mt-10 flex justify-between items-center pt-6 border-t border-gray-200'>
      <p>
        Showing <span className='font-medium'>1</span> to <span className='font-medium'>10</span> of{' '}
        <span className='font-medium'>97</span> results
      </p>

      <nav className='flex'>
        <Link className='px-3 py-2 border border-gray-300 rounded-l-md text-xs text-gray-500 inline-flex items-center hover:bg-gray-50'>
          <FaChevronLeft />
        </Link>

        <Link className='px-4 py-2 border border-l-0 border-indigo-600 bg-indigo-600 text-white font-medium hover:bg-indigo-600'>
          1
        </Link>

        {[...new Array(7)].map((_, index) => (
          <Link className='px-4 py-2 border border-l-0 border-gray-300 text-gray-600 font-medium hover:bg-gray-50'>
            {index + 2}
          </Link>
        ))}

        <Link className='px-3 py-2 border border-l-0 border-gray-300 rounded-r-md text-xs text-gray-500 inline-flex items-center hover:bg-gray-50'>
          <FaChevronRight />
        </Link>
      </nav>
    </div>
  );
};

export default Pagination;
