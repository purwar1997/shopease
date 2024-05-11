import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useHandleModal } from '../utils/customHooks';
import { RxCross2 } from 'react-icons/rx';
import { MdError } from 'react-icons/md';
import { deleteUserAsync, fetchAllUsersAsync } from '../app/slices/userSlice';
import { clearCart } from '../app/slices/cartSlice';
import { clearWishlist } from '../app/slices/wishlistSlice';
import { classNames, handleClickOutside } from '../utils/helpers';

const DeleteUserModal = ({ closeModal, user, pagination, loggedInUser }) => {
  const [deleteStatus, setDeleteStatus] = useState('idle');

  const adminCount = useSelector(state => state.user.adminCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useHandleModal(closeModal);

  const handleDeleteUser = async () => {
    try {
      setDeleteStatus('pending');
      await dispatch(deleteUserAsync({ user, loggedInUser })).unwrap();

      if (user.id === loggedInUser.id) {
        dispatch(clearCart());
        dispatch(clearWishlist());
        navigate('/signup', { replace: true });
      } else {
        dispatch(fetchAllUsersAsync(pagination));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteStatus('idle');
    }
  };

  return (
    <div
      className='w-screen h-screen fixed top-0 left-0 bg-black/40 flex justify-center items-center z-30'
      onClick={e => handleClickOutside(e, closeModal)}
    >
      <section className='w-96 bg-white rounded-lg'>
        <header className='bg-gray-100 px-6 py-4 rounded-t-lg border-b border-gray-300 flex justify-between items-center'>
          <h2 className='text-lg'>
            {user.id === loggedInUser.id && adminCount === 1
              ? 'Deletion Failed'
              : 'Confirm Deletion'}
          </h2>

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
              {user.id === loggedInUser.id
                ? adminCount === 1
                  ? 'You are the only existing admin right now. Please promote another user to the role of an admin. Only then you can delete your account.'
                  : "Upon deleting your account, all related data (orders placed, saved addresses, profile info, etc.) will get deleted and you'll be redirected to the signup page. Do you wish to continue?"
                : 'Upon deleting this user, all related data (orders placed, saved addresses, profile info, etc.) will get deleted. Do you wish to continue?'}
            </p>
          </div>

          {user.id === loggedInUser.id && adminCount === 1 ? (
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
                  deleteStatus === 'pending' ? 'cursor-wait' : ''
                )}
                onClick={handleDeleteUser}
                disabled={deleteStatus === 'pending'}
              >
                Yes
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DeleteUserModal;
