import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { signupInputs } from '../utils/formInputs';
import InputControl from '../components/InputControl';

const Signup = () => {
  const [signupCredentials, setSignupCredentials] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.pattern = signupCredentials.password;
  }, [signupCredentials.password]);

  const handleChange = e => {
    setSignupCredentials({ ...signupCredentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    console.log(signupCredentials);
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
            className='w-full bg-indigo-600 py-2.5 rounded-md text-white font-medium hover:opacity-85'
            type='submit'
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
