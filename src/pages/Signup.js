import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signupInputs } from '../utils/formInputs';
import { signupAsync } from '../app/slices/authSlice';
import { classNames } from '../utils/helpers';
import InputControl from '../components/InputControl';
import ButtonLoader from '../components/ButtonLoader';

const Signup = () => {
  const [signupCredentials, setSignupCredentials] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.pattern = signupCredentials.password;
  }, [signupCredentials.password]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => {
    setSignupCredentials({ ...signupCredentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setStatus('pending');
      await dispatch(signupAsync(signupCredentials)).unwrap();
      navigate('/login', { replace: true });
    } catch (error) {
      setError(error.message);
    } finally {
      setStatus('idle');
    }
  };

  return (
    <main className='max-w-screen min-h-screen p-12 flex justify-center items-center'>
      <div className='flex flex-col items-center gap-10'>
        <div className='space-y-5'>
          <img
            className='h-12 block mx-auto'
            src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
            alt='company-logo'
          />
          <h1 className='text-2xl'>Create your account</h1>
        </div>

        <form className='w-[420px] space-y-5' onSubmit={handleSubmit}>
          <div className='flex gap-4'>
            {signupInputs.slice(0, 2).map(input => (
              <InputControl
                key={input.id}
                {...input}
                value={signupCredentials[input.name]}
                onChange={handleChange}
              />
            ))}
          </div>

          {signupInputs.slice(2, 4).map(input => (
            <InputControl
              key={input.id}
              {...input}
              value={signupCredentials[input.name]}
              onChange={handleChange}
            />
          ))}

          {signupInputs.slice(4).map(input => (
            <InputControl
              key={input.id}
              {...input}
              value={signupCredentials[input.name]}
              onChange={handleChange}
              ref={inputRef}
            />
          ))}

          <button
            className={classNames(
              'w-full h-11 bg-indigo-600 rounded-md text-white font-medium hover:opacity-85 flex justify-center items-center',
              status === 'pending' ? 'cursor-wait' : ''
            )}
            type='submit'
            disabled={status === 'pending'}
          >
            {status === 'pending' ? <ButtonLoader /> : 'Sign up'}
          </button>
        </form>

        {error && <p>{error}</p>}

        <p className='text-gray-500'>
          Already a member?{' '}
          <Link className='text-indigo-600 font-medium hover:text-indigo-500' to='/login'>
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Signup;
