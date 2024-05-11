import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useHandleModal } from '../utils/customHooks';
import { RxCross2 } from 'react-icons/rx';
import { MdError } from 'react-icons/md';
import { deleteAccountAsync, fetchAdminsAsync } from '../app/slices/userSlice';
import { clearCart } from '../app/slices/cartSlice';
import { clearWishlist } from '../app/slices/wishlistSlice';
import { classNames, handleClickOutside } from '../utils/helpers';
import LoadingSpinner from './LoadingSpinner';

const DeleteAccountModal = ({ closeModal, user }) => {
  const [deleteStatus, setDeleteStatus] = useState('idle');

  const status = useSelector(state => state.user.adminStatus);
  const adminCount = useSelector(state => state.user.adminCount);
  const error = useSelector(state => state.user.adminError);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useHandleModal(closeModal);

  useEffect(() => {
    dispatch(fetchAdminsAsync());
  }, [dispatch]);

  const handleDeleteAccount = async () => {
    try {
      setDeleteStatus('pending');
      await dispatch(deleteAccountAsync(user.id)).unwrap();
      dispatch(clearCart());
      dispatch(clearWishlist());
      navigate('/signup', { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteStatus('idle');
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
            <h2 className='text-lg'>Delete Account</h2>

            <button className='text-2xl' onClick={closeModal}>
              <RxCross2 />
            </button>
          </header>

          <div className='px-6 py-4'>
            <p className='flex items-start gap-2.5 text-red-500'>
              <span className='relative text-xl top-px'>
                <MdError />
              </span>

              {user.role === 'admin' && adminCount === 1
                ? "You're the only existing admin right now. Please promote another user to the role of an admin. Only then you can delete your account."
                : 'Upon deleting your account, all related data (orders placed, saved addresses, profile info, etc.) will get deleted and can never be recovered. Do you wish to continue?'}
            </p>

            <div className='mt-5 pt-5 border-t border-gray-200 flex justify-center gap-5'>
              {user.role === 'admin' && adminCount === 1 ? (
                <>
                  <button
                    className='w-20 py-1 border border-gray-300 bg-white rounded-md text-sm hover:bg-gray-100'
                    onClick={() => navigate('/admin/users')}
                  >
                    Proceed
                  </button>

                  <button
                    className='w-20 py-1 border border-gray-300 bg-white rounded-md text-sm hover:bg-gray-100'
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className='w-20 py-1 border border-gray-300 bg-white rounded-md text-sm hover:bg-gray-100'
                    onClick={closeModal}
                  >
                    No
                  </button>

                  <button
                    className={classNames(
                      'w-20 py-1 border border-indigo-500 bg-indigo-500 rounded-md text-sm text-white hover:bg-indigo-600',
                      deleteStatus === 'pending' ? 'cursor-wait' : ''
                    )}
                    onClick={handleDeleteAccount}
                    disabled={deleteStatus === 'pending'}
                  >
                    Yes
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default DeleteAccountModal;
