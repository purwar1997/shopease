import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signupInputs } from '../utils/formInputs';
import InputControl from '../components/InputControl';

const Signup = () => {
  const [signupCredentials, setSignupCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = e =>
    setSignupCredentials({ ...signupCredentials, [e.target.name]: e.target.value });

  for (const input of signupInputs) {
    if (input.id === 'confirm-password') {
      input.pattern = signupCredentials.password;
      break;
    }
  }

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
          {signupInputs.map(input => (
            <InputControl
              key={input.id}
              {...input}
              value={signupCredentials[input.name]}
              onChange={handleChange}
            />
          ))}

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
