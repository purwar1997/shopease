import { useState, useMemo } from 'react';
import { classNames } from '../services';

const SelectControl = props => {
  const { label, id, value, options, errorMessage, ...otherProps } = props;

  const [inputBlurred, setInputBlurred] = useState(false);

  const optionList = useMemo(
    () => Array.from(new Set(options.map(option => option.name))).toSorted(),
    [options]
  );

  const handleBlur = () => setInputBlurred(true);

  return (
    <div className='flex-1 flex flex-col items-start gap-2'>
      <label className='font-medium text-gray-500' htmlFor={id}>
        {label}
      </label>

      <select
        className='peer w-full px-3 py-2 ring-1 ring-gray-300 shadow rounded-md focus:ring-2 focus:ring-indigo-500'
        id={id}
        value={value ?? ''}
        {...otherProps}
        disabled={options.length === 0}
        onBlur={handleBlur}
      >
        <option value='' disabled hidden />

        {optionList.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <p
        className={classNames(
          'hidden text-sm text-red-600 peer-valid:hidden',
          inputBlurred ? 'peer-invalid:block' : ''
        )}
      >
        {errorMessage}
      </p>
    </div>
  );
};

export default SelectControl;
