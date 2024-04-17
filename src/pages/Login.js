import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginInputs } from '../utils/formInputs';
import { login } from '../app/slices/authSlice';
import { classNames } from '../utils/helpers';
import InputControl from '../components/InputControl';
import ButtonLoader from '../components/ButtonLoader';

const Login = () => {
  const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e =>
    setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setStatus('pending');
      const user = await dispatch(login(loginCredentials)).unwrap();

      if (user) {
        navigate('/', { replace: true });
      }
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
          <h1 className='text-2xl'>Sign in to your account</h1>
        </div>

        <form className='w-[420px] space-y-5' onSubmit={handleSubmit}>
          {loginInputs.map(input => (
            <InputControl
              key={input.id}
              {...input}
              value={loginCredentials[input.name]}
              onChange={handleChange}
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
            {status === 'pending' ? <ButtonLoader /> : 'Sign in'}
          </button>
        </form>

        {error && <p>{error}</p>}

        <p className='text-gray-500'>
          Not a member?{' '}
          <Link className='text-indigo-600 font-medium hover:text-indigo-500' to='/signup'>
            Signup
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
