import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa6';

const FilterAccordian = ({ filter }) => {
  const [expandAccordian, setExpandAccordian] = useState(false);

  return (
    <div className='w-48'>
      <div
        className='flex justify-between items-center py-3 cursor-pointer group'
        onClick={() => setExpandAccordian(!expandAccordian)}
      >
        <span className='font-medium text-gray-500 text-sm'>{filter.name}</span>

        <span className='text-sm text-gray-400 group-hover:text-gray-600'>
          {expandAccordian ? <FaMinus /> : <FaPlus />}
        </span>
      </div>

      {expandAccordian && (
        <div className='space-y-1.5 mb-3'>
          {filter.options.map(option => (
            <div className='space-x-3' key={option.label}>
              <input type='checkbox' id={option.label} value={option.value} />
              <label className='text-sm' htmlFor={option.label}>
                {option.label}
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
