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
    <main className='max-w-screen min-h-screen p-12 flex justify-center items-center'>
      <div className='max-w-md w-full flex flex-col items-center gap-10'>
        <header>
          <img
            className='h-10 block mx-auto'
            src='https://res.cloudinary.com/dlqnx5pot/image/upload/v1724768966/shopease-logo_a9ayl7.svg'
            alt='shopease-logo'
          />
          <h1 className='mt-5 text-2xl'>Enter email to reset password</h1>
        </header>

        <form className='w-full space-y-5' onSubmit={handleSubmit}>
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
