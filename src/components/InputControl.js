import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { classNames } from '../utils/helpers';
import { countryMenuOptions } from '../utils/selectMenuOptions';

const InputControl = ({ ...input }) => {
  const [inputBlurred, setInputBlurred] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const inputContainerRef = useRef(null);
  const inputFocusRef = useRef(false);

  const { isLogin, label, id, type, errorMessage, ...attributes } = input;

  useEffect(() => {
    const handleClickOutside = event => {
      if (!inputContainerRef.current?.contains(event.target)) {
        if (inputFocusRef.current) {
          setInputBlurred(true);
        }

        if (type === 'password') {
          buttonRef.current?.classList.replace('inline', 'hidden');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [type]);

  const handleFocus = () => {
    inputFocusRef.current = true;

    if (type === 'password') {
      buttonRef.current.classList.replace('hidden', 'inline');
    }
  };

  const handleClick = () => setShowPassword(!showPassword);

  return (
    <div className='flex flex-col gap-2'>
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

      <div
        className='peer flex ring-1 ring-gray-300 shadow rounded-md focus-within:ring-2 focus-within:ring-indigo-500'
        ref={inputContainerRef}
      >
        {type ? (
          <>
            <input
              className={classNames(
                'w-full py-2 rounded-md',
                type === 'password' ? 'pl-3' : 'px-3'
              )}
              id={id}
              type={type === 'password' ? (showPassword ? 'text' : type) : type}
              {...attributes}
              onFocus={handleFocus}
              ref={inputRef}
            />

            {type === 'password' && (
              <button
                type='button'
                className='px-3 bg-white rounded-r-md hidden'
                onClick={handleClick}
                ref={buttonRef}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            )}
          </>
        ) : (
          <select
            className='w-full px-3 py-2 rounded-md'
            id={id}
            {...attributes}
            onFocus={handleFocus}
            ref={inputRef}
          >
            <option value='' disabled hidden />

            {countryMenuOptions.map(item => (
              <option key={item.label} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        )}
      </div>

      <p
        className={classNames(
          'hidden text-sm text-red-600 peer-has-[:valid]:hidden',
          inputBlurred ? 'peer-has-[:invalid]:block' : ''
        )}
      >
        {errorMessage}
      </p>
    </div>
  );
};

export default InputControl;
