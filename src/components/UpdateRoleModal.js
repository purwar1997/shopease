import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useHandleModal } from '../utils/customHooks';
import { RxCross2 } from 'react-icons/rx';
import { MdError } from 'react-icons/md';
import { updateUserRoleAsync, fetchAdminsAsync } from '../app/slices/userSlice';
import { classNames, handleClickOutside } from '../utils/helpers';
import LoadingSpinner from './LoadingSpinner';

const UpdateRoleModal = ({ closeModal, user }) => {
  const [updateStatus, setUpdateStatus] = useState('idle');

  const status = useSelector(state => state.user.adminStatus);
  const adminCount = useSelector(state => state.user.adminCount);
  const error = useSelector(state => state.user.adminError);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useHandleModal(closeModal);

  useEffect(() => {
    dispatch(fetchAdminsAsync());
  }, [dispatch]);

  const handleUpdateRole = async () => {
    try {
      setUpdateStatus('pending');
      await dispatch(updateUserRoleAsync({ id: user.id, role: 'user', user })).unwrap();
      navigate('/', { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      setUpdateStatus('idle');
    }
  };

  if (error) {
    throw error;
  }

  return (
    <div
      className='w-screen h-screen fixed top-0 left-0 bg-black/40 flex justify-center items-center z-30'
      onClick={e => handleClickOutside(e, closeModal)}
    >
      {status === 'idle' || status === 'loading' ? (
        <LoadingSpinner />
      ) : (
        <section className='w-96 bg-white rounded-lg'>
          <header className='bg-gray-100 px-6 py-4 rounded-t-lg border-b border-gray-300 flex justify-between items-center'>
            <h2 className='text-lg'>Update Role</h2>

            <button className='text-2xl' onClick={closeModal}>
              <RxCross2 />
            </button>
          </header>

          <div className='px-6 py-4'>
            <div className='flex items-start gap-2.5 *:text-red-500'>
              <span className='relative text-xl top-px'>
                <MdError />
              </span>

              <p className='text-base'>
                {adminCount === 1
                  ? "You're the only existing admin right now. Please promote another user to the role of an admin. Only then you can demote yourself to the role of a user."
                  : "If you demote yourself to the role of a user, you'll lose your rights to access admin panel and will be redirected to a home page. Do you wish to continue?"}
              </p>
            </div>

            {adminCount === 1 ? (
              <div className='mt-5 pt-5 border-t border-gray-200 flex justify-end'>
                <button
                  className='w-20 py-1 border border-indigo-500 bg-indigo-500 rounded-md text-sm text-white hover:bg-indigo-600'
                  onClick={closeModal}
                >
                  Ok
                </button>
              </div>
            ) : (
              <div className='mt-5 pt-5 border-t border-gray-200 flex justify-center gap-5'>
                <button
                  className='w-20 py-1 border border-gray-300 bg-white rounded-md text-sm hover:bg-gray-100'
                  onClick={closeModal}
                >
                  No
                </button>

                <button
                  className={classNames(
                    'w-20 py-1 border border-indigo-500 bg-indigo-500 rounded-md text-sm text-white hover:bg-indigo-600',
                    updateStatus === 'pending' ? 'cursor-wait' : ''
                  )}
                  onClick={handleUpdateRole}
                  disabled={updateStatus === 'pending'}
                >
                  Yes
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default UpdateRoleModal;
