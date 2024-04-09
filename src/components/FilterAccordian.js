import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaPlus, FaMinus, FaStar } from 'react-icons/fa6';
import { fetchProducts } from '../app/slices/productSlice';

const FilterAccordian = ({ filter }) => {
  const [expandAccordian, setExpandAccordian] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(window.location.search);

  const handleFilter = e => {
    const { name, value, type } = e.target;

    setSearchParams(params => {
      if (params.has(name, value)) {
        params.delete(name, value);
      } else {
        type === 'radio' ? params.set(name, value) : params.append(name, value);
      }

      return params;
    });

    const queryString = searchParams.toString().replace('rating', 'rating_gte');
    dispatch(fetchProducts(queryString));

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='w-48'>
      <div
        className='flex justify-between items-center py-3.5 cursor-pointer group'
        onClick={() => setExpandAccordian(!expandAccordian)}
      >
        <span className='font-medium text-gray-500 text-sm'>{filter.name}</span>

        <span className='text-sm text-gray-400 group-hover:text-gray-600'>
          {expandAccordian ? <FaMinus /> : <FaPlus />}
        </span>
      </div>

      {expandAccordian && (
        <div className='space-y-3 mb-4'>
          {filter.options.map(option => (
            <div className='flex gap-3' key={option}>
              <input
                type={filter.id === 'rating' ? 'radio' : 'checkbox'}
                id={option}
                name={filter.id}
                value={option}
                onChange={handleFilter}
                checked={queryParams.has(filter.id, option)}
              />

              <label className='text-sm' htmlFor={option}>
                {filter.id === 'rating' ? (
                  <span className='flex gap-1'>
                    {[...new Array(option)].map((_, index) => (
                      <FaStar className='text-yellow-500' key={index} />
                    ))}
                  </span>
                ) : (
                  option
                )}
              </label>
            </div>
          ))}
        </div>
      )}

      <hr />
    </div>
  );
};

export default FilterAccordian;
