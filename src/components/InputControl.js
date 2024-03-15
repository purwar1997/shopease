import { useState } from 'react';
import { Link } from 'react-router-dom';
import { classNames } from '../utils/helpers';
import { countryMenuOptions } from '../utils/selectMenuOptions';

const InputControl = ({ ...input }) => {
  const [isBlurred, setIsBlurred] = useState(false);
  const { isLogin, label, id, errorMessage, ...attributes } = input;

  return (
    <div
      className={classNames(
        'flex-1 flex flex-col gap-2',
        isLogin ? 'items-stretch' : 'items-start'
      )}
    >
      <div>
        <label className='font-medium text-gray-500' htmlFor={id}>
          {label}
        </label>

        {isLogin && (
          <Link
            className='float-right font-medium text-indigo-600 hover:text-indigo-500'
            to='/forgot-password'
          >
            Forgot password?
          </Link>
        )}
      </div>

      {input.type ? (
        <input
          className='peer w-full px-3 py-2 ring-1 ring-gray-300 shadow rounded-md focus:ring-2 focus:ring-indigo-500'
          id={id}
          {...attributes}
          onBlur={() => setIsBlurred(true)}
        />
      ) : (
        <select
          className='peer w-full px-3 py-2 ring-1 ring-gray-300 shadow rounded-md focus:ring-2 focus:ring-indigo-500'
          id={id}
          {...attributes}
          onBlur={() => setIsBlurred(true)}
        >
          <option value='' disabled hidden />

          {countryMenuOptions.map(item => (
            <option key={item.label} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      )}

      <p
        className={classNames(
          'hidden text-sm text-red-600 peer-valid:hidden',
          isBlurred ? 'peer-invalid:block' : ''
        )}
      >
        {errorMessage}
      </p>
    </div>
  );
};

export default InputControl;
