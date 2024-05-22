import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser } from '../app/slices/userSlice';
import { updateProfileAsync } from '../app/slices/userSlice';
import { editProfileInputs } from '../utils/formInputs';
import { classNames } from '../services';
import InputControl from '../components/InputControl';
import DeleteAccountModal from '../components/DeleteAccountModal';

const UpdateProfle = () => {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  const [profile, setProfile] = useState({ ...user, password: '', confirmPassword: '' });
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [status, setStatus] = useState('idle');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.setAttribute('pattern', profile.password);

    if (profile.password) {
      inputRef.current.setAttribute('required', true);
    } else {
      inputRef.current.removeAttribute('required');
    }
  }, [profile.password]);

  const handleChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setStatus('pending');

      const updatedProfile = await dispatch(
        updateProfileAsync({ id: user.id, updates: profile })
      ).unwrap();

      setProfile({ ...updatedProfile, password: '', confirmPassword: '' });
    } catch (error) {
      console.log(error);
    } finally {
      setStatus('idle');
    }
  };

  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

  return (
    <main className='page-height px-16 py-10'>
      <h1 className='text-3xl'>Edit profile</h1>

      <div className='mt-8 space-y-10'>
        <section>
          {/* Todo: Upload profile photo */}

          <form onSubmit={handleSubmit}>
            <div className='flex gap-6'>
              <InputControl
                {...editProfileInputs[0]}
                value={profile[editProfileInputs[0].name]}
                onChange={handleChange}
              />

              <InputControl
                {...editProfileInputs[1]}
                value={profile[editProfileInputs[1].name]}
                onChange={handleChange}
              />
            </div>

            <div className='mt-5 flex gap-6'>
              <InputControl
                {...editProfileInputs[2]}
                value={profile[editProfileInputs[2].name]}
                onChange={handleChange}
              />

              <InputControl
                {...editProfileInputs[3]}
                value={profile[editProfileInputs[3].name]}
                onChange={handleChange}
              />
            </div>

            <div className='mt-5 flex gap-6'>
              <InputControl
                {...editProfileInputs[4]}
                value={profile[editProfileInputs[4].name]}
                onChange={handleChange}
              />

              <InputControl
                {...editProfileInputs[5]}
                value={profile[editProfileInputs[5].name]}
                onChange={handleChange}
                ref={inputRef}
              />
            </div>

            <button
              className={classNames(
                'mt-6 w-40 h-11 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 flex justify-center items-center',
                status === 'pending' ? 'cursor-wait' : ''
              )}
              type='submit'
              disabled={status === 'pending'}
            >
              Save changes
            </button>
          </form>
        </section>

        <section>
          <h2 className='text-2xl'>Delete your account</h2>
          <p className='mt-3'>
            All your data (orders placed, saved addresses, profile info, etc.) will get deleted.
          </p>
          <button
            className='mt-6 w-40 h-11 border border-red-600 text-red-600 rounded-md focus-visible:outline-none'
            onClick={toggleDeleteModal}
          >
            Delete account
          </button>
        </section>
      </div>

      {openDeleteModal && <DeleteAccountModal closeModal={toggleDeleteModal} user={user} />}
    </main>
  );
};

export default UpdateProfle;
