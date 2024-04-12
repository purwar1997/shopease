import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaPlus, FaMinus, FaStar } from 'react-icons/fa6';
import { fetchProductsByFilter } from '../app/slices/productSlice';

const FilterAccordian = ({
  filterOption,
  filters,
  setFilters,
  sort,
  pagination,
  setPagination,
}) => {
  const [expandAccordian, setExpandAccordian] = useState(false);
  const dispatch = useDispatch();

  const handleFilter = (e, filterType, filterValue) => {
    let newFilters = { ...filters };
    let newPagination = { ...pagination, page: 1 };

    if (e.target.checked) {
      if (filterType === 'category' || filterType === 'brand') {
        if (newFilters[filterType]) {
          filterValue = newFilters[filterType].concat(filterValue);
        } else {
          filterValue = [filterValue];
        }
      }

      newFilters = { ...filters, [filterType]: filterValue };
    } else {
      newFilters[filterType] = newFilters[filterType].filter(value => value !== filterValue);

      if (newFilters[filterType].length === 0) {
        delete newFilters[filterType];
      }
    }

    setFilters(newFilters);
    setPagination(newPagination);
    dispatch(fetchProductsByFilter({ filters: newFilters, sort, pagination: newPagination }));

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
        <span className='font-medium text-gray-500 text-sm'>{filterOption.name}</span>

        <span className='text-sm text-gray-400 group-hover:text-gray-600'>
          {expandAccordian ? <FaMinus /> : <FaPlus />}
        </span>
      </div>

      {expandAccordian && (
        <div className='space-y-3 mb-4'>
          {filterOption.options.map(option => (
            <div className='flex gap-3' key={option}>
              <input
                type={filterOption.id === 'rating' ? 'radio' : 'checkbox'}
                id={option}
                name={filterOption.id}
                value={option}
                onChange={e => handleFilter(e, filterOption.id, option)}
                checked={
                  filterOption.id === 'rating'
                    ? filters[filterOption.id] === option
                    : filters[filterOption.id]?.includes(option) ?? false
                }
              />

              <label className='text-sm' htmlFor={option}>
                {filterOption.id === 'rating' ? (
                  <span className='flex gap-1'>
                    {Array.from({ length: option }).map((_, index) => (
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
