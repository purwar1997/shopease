import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { loginAsync } from '../app/slices/userSlice';
import { loginInputs } from '../utils/formInputs';
import { classNames } from '../utils/helpers';
import InputControl from '../components/InputControl';
import ButtonLoader from '../components/ButtonLoader';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('idle');
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const redirectURL = searchParams.get('redirectTo');

  const handleChange = e => setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setStatus('pending');
      const user = await dispatch(loginAsync(loginInfo)).unwrap();
      navigate(redirectURL ?? (user.role === 'admin' ? '/admin/products' : '/'), { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      setStatus('idle');
    }
  };

  return (
    <main className='max-w-screen min-h-screen p-12 flex justify-center items-center'>
      <div className='max-w-md w-full flex flex-col items-center gap-10'>
        <header className='space-y-3'>
          <img
            className='h-12 block mx-auto'
            src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
            alt='company-logo'
          />
          <h1 className='text-2xl'>Sign in to your account</h1>
        </header>

        <form className='w-full space-y-5' onSubmit={handleSubmit}>
          {loginInputs.map(input => (
            <InputControl
              key={input.id}
              {...input}
              value={loginInfo[input.name]}
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
