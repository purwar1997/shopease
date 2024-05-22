import { useState } from 'react';
import { classNames } from '../services';

const TextareaControl = props => {
  const { label, id, value, errorMessage, ...otherProps } = props;

  const [inputBlurred, setInputBlurred] = useState(false);

  const handleBlur = () => setInputBlurred(true);

  return (
    <div className='flex-1 flex flex-col items-start gap-2'>
      <label className='font-medium text-gray-500' htmlFor={id}>
        {label}
      </label>

      <textarea
        className='peer w-full h-24 px-3 py-2 ring-1 ring-gray-300 rounded-md shadow resize-y focus:ring-2 focus:ring-indigo-500'
        id={id}
        value={value ?? ''}
        {...otherProps}
        onBlur={handleBlur}
      />

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

export default TextareaControl;
