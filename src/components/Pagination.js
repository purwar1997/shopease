import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const Pagination = () => {
  return (
    <div className='mt-10 flex justify-between items-center pt-6 border-t border-t-gray-200'>
      <p>
        Showing <span className='text-black'>1</span> to <span className='text-black'>10</span> of{' '}
        <span className='text-black'>97</span> results
      </p>

      <nav className='border border-gray-300 rounded flex'>
        <Link className='px-3.5 py-1.5 border-r border-r-gray-300 text-xs text-gray-500 flex items-center'>
          <FaChevronLeft />
        </Link>

        <Link className='px-3.5 py-1.5 border-r border-r-gray-300 font-medium bg-indigo-500 text-white'>
          1
        </Link>

        {[...new Array(7)].map((_, index) => (
          <Link className='px-3.5 py-1.5 border-r border-r-gray-300 text-gray-600 font-medium'>
            {index + 2}
          </Link>
        ))}

        <Link className='px-3.5 py-1.5 text-xs text-gray-500 flex items-center'>
          <FaChevronRight />
        </Link>
      </nav>
    </div>
  );
};

export default Pagination;
