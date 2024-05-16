import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signupAsync } from '../app/slices/userSlice';
import { signupInputs } from '../utils/formInputs';
import { classNames } from '../utils/helpers';
import InputControl from '../components/InputControl';
import ButtonLoader from '../components/ButtonLoader';

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phoneNo: '',
    password: '',
    confirmPassword: '',
  });

  const [status, setStatus] = useState('idle');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.setAttribute('pattern', signupInfo.password);
  }, [signupInfo.password]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setStatus('pending');
      await dispatch(signupAsync(signupInfo)).unwrap();
      navigate('/login', { replace: true });
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
          <h1 className='text-2xl'>Create your account</h1>
        </header>

        <form className='w-full space-y-5' onSubmit={handleSubmit}>
          <div className='flex gap-4'>
            <InputControl
              {...signupInputs[0]}
              value={signupInfo[signupInputs[0].name]}
              onChange={handleChange}
            />

            <InputControl
              {...signupInputs[1]}
              value={signupInfo[signupInputs[1].name]}
              onChange={handleChange}
            />
          </div>

          <InputControl
            {...signupInputs[2]}
            value={signupInfo[signupInputs[2].name]}
            onChange={handleChange}
          />

          <InputControl
            {...signupInputs[3]}
            value={signupInfo[signupInputs[3].name]}
            onChange={handleChange}
          />

          <InputControl
            {...signupInputs[4]}
            value={signupInfo[signupInputs[4].name]}
            onChange={handleChange}
          />

          <InputControl
            {...signupInputs[5]}
            value={signupInfo[signupInputs[5].name]}
            onChange={handleChange}
            ref={inputRef}
          />

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
