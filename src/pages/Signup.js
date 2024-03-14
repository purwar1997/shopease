import { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [signupCredentials, setSignupCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = e =>
    setSignupCredentials({ ...signupCredentials, [e.target.name]: e.target.value });

  return (
    <main className='w-screen h-screen flex justify-center items-center'>
      <div className='flex flex-col items-center gap-10'>
        <div className='space-y-5'>
          <img
            className='h-12 block mx-auto'
            src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
            alt='company-logo'
          />
          <h1 className='text-2xl'>Create your account</h1>
        </div>

        <form className='w-96 space-y-5'>
          <div className='flex flex-col items-start gap-3'>
            <label className='font-medium text-gray-500' htmlFor='email'>
              Email address
            </label>

            <input
              className='w-full px-3 py-2 ring-1 ring-gray-300 shadow rounded-md focus:ring-2 focus:ring-indigo-500'
              type='email'
              name='email'
              id='email'
              autoComplete='email'
              value={signupCredentials.email}
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col items-start gap-3'>
            <label className='font-medium text-gray-500' htmlFor='password'>
              Password
            </label>

            <input
              className='w-full px-3 py-2 ring-1 ring-gray-300 shadow rounded-md focus:ring-2 focus:ring-indigo-500'
              type='password'
              name='password'
              id='password'
              autoComplete='new-password'
              value={signupCredentials.password}
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col items-start gap-3'>
            <label className='font-medium text-gray-500' htmlFor='confirm-password'>
              Confirm password
            </label>

            <input
              className='w-full px-3 py-2 ring-1 ring-gray-300 shadow rounded-md focus:ring-2 focus:ring-indigo-500'
              type='password'
              name='confirmPassword'
              id='confirm-password'
              autoComplete='new-password'
              value={signupCredentials.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            className='w-full bg-indigo-600 py-2.5 rounded-md text-white font-medium hover:opacity-85'
            type='button'
          >
            Sign up
          </button>
        </form>

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
