import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPasswordInput } from '../utils/formInputs';
import InputControl from '../components/InputControl';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    console.log(email);
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
          <h1 className='text-2xl'>Enter email to reset password</h1>
        </div>

        <form className='w-96 space-y-5' onSubmit={handleSubmit}>
          <InputControl
            {...forgotPasswordInput}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <button
            className='w-full bg-indigo-600 py-2.5 rounded-md text-white font-medium hover:opacity-85'
            type='submit'
          >
            Send email
          </button>
        </form>

        <p className='text-gray-500'>
          Send me back to{' '}
          <Link className='text-indigo-600 font-medium hover:text-indigo-500' to='/login'>
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default ForgotPassword;
