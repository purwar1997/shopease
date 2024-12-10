import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { loginAsync } from '../app/slices/userSlice';
import { loginInputs } from '../utils/formInputs';
import { classNames } from '../services';
import { ADMIN_DETAILS } from '../utils/constants';
import InputControl from '../components/InputControl';
import ButtonLoader from '../components/ButtonLoader';
import CopyToClipboardBtn from '../components/CopyToClipboardBtn';

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
        <header>
          <img
            className='h-10 block mx-auto'
            src='https://res.cloudinary.com/dlqnx5pot/image/upload/v1724768966/shopease-logo_a9ayl7.svg'
            alt='shopease-logo'
          />
          <h1 className='mt-5 text-2xl'>Sign in to your account</h1>
        </header>

        <div className='w-full border-2 border-indigo-500 rounded-md px-3.5 py-2.5 space-y-1.5'>
          <p>To login as an admin, use following credentials -</p>

          <div className='flex justify-between items-center gap-5'>
            <p>
              <span className='font-medium text-indigo-600'>Email address -</span>{' '}
              {ADMIN_DETAILS.EMAIL}
            </p>

            {/* <CopyToClipboardBtn textToCopy={ADMIN_DETAILS.EMAIL} /> */}
          </div>

          <div className='flex justify-between items-center gap-5'>
            <p>
              <span className='font-medium text-indigo-600'>Password -</span>{' '}
              {ADMIN_DETAILS.PASSWORD}
            </p>

            {/* <CopyToClipboardBtn textToCopy={ADMIN_DETAILS.PASSWORD} /> */}
          </div>
        </div>

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
