import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { classNames } from '../services';

const Pagination = ({ pagination, setPagination, itemsPerPage, totalCount }) => {
  const handlePagination = currentPage => {
    setPagination({ ...pagination, page: currentPage });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    totalCount > itemsPerPage && (
      <div className='mt-10 flex justify-between items-center pt-6 border-t border-gray-200'>
        <p>
          Showing <span className='font-medium'>{(pagination.page - 1) * itemsPerPage + 1}</span> to{' '}
          <span className='font-medium'>
            {pagination.page * itemsPerPage > totalCount
              ? totalCount
              : pagination.page * itemsPerPage}
          </span>{' '}
          of <span className='font-medium'>{totalCount}</span> results
        </p>

        <nav className='flex'>
          <button
            className={classNames(
              'px-3 py-2 border border-gray-300 rounded-l-md text-xs text-gray-500 inline-flex items-center hover:bg-gray-50',
              pagination.page === 1 ? 'cursor-not-allowed' : ''
            )}
            onClick={() => handlePagination(pagination.page - 1)}
            disabled={pagination.page === 1}
          >
            <FaChevronLeft />
          </button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              className={classNames(
                'px-4 py-2 border border-l-0 font-medium',
                pagination.page === index + 1
                  ? 'bg-indigo-600 border-indigo-600 text-white'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              )}
              key={index}
              onClick={() => handlePagination(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={classNames(
              'px-3 py-2 border border-l-0 border-gray-300 rounded-r-md text-xs text-gray-500 inline-flex items-center hover:bg-gray-50',
              pagination.page === totalPages ? 'cursor-not-allowed' : ''
            )}
            onClick={() => handlePagination(pagination.page + 1)}
            disabled={pagination.page === totalPages}
          >
            <FaChevronRight />
          </button>
        </nav>
      </div>
    )
  );
};

export default Pagination;
