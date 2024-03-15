import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginInputs } from '../utils/formInputs';
import InputControl from '../components/InputControl';

const Login = () => {
  const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' });

  const handleChange = e =>
    setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    console.log(loginCredentials);
  };

  return (
    <main className='w-screen h-screen flex justify-center items-center'>
      <div className='flex flex-col items-center gap-10'>
        <div className='space-y-5'>
          <img
            className='h-12 block mx-auto'
            src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
            alt='company-logo'
          />
          <h1 className='text-2xl'>Sign in to your account</h1>
        </div>

        <form className='w-96 space-y-5' onSubmit={handleSubmit}>
          {loginInputs.map(input => (
            <InputControl
              key={input.id}
              {...input}
              value={loginCredentials[input.name]}
              onChange={handleChange}
            />
          ))}

          <button
            className='w-full bg-indigo-600 py-2.5 rounded-md text-white font-medium hover:opacity-85'
            type='submit'
          >
            Sign in
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
