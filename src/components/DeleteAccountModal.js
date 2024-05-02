import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useHandleModal } from '../utils/customHooks';
import { RxCross2 } from 'react-icons/rx';
import { MdError } from 'react-icons/md';
import { deleteAccountAsync } from '../app/slices/userSlice';
import { clearCart } from '../app/slices/cartSlice';
import { clearWishlist } from '../app/slices/wishlistSlice';
import { classNames, handleClickOutside } from '../utils/helpers';

const DeleteAccountModal = ({ closeModal, userId }) => {
  const [status, setStatus] = useState('idle');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useHandleModal(closeModal);

  const handleDeleteAccount = async () => {
    try {
      setStatus('pending');
      await dispatch(deleteAccountAsync(userId)).unwrap();
      dispatch(clearCart());
      dispatch(clearWishlist());
      navigate('/signup', { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      setStatus('idle');
    }
  };

  return (
    <div
      className='w-screen h-screen fixed top-0 left-0 bg-black/40 flex justify-center items-center z-30'
      onClick={e => handleClickOutside(e, closeModal)}
    >
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
            All your data (orders placed, saved addresses, profile info, etc.) will get deleted and
            can't be recovered. Do you still wish to continue?
          </p>

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
                status === 'pending' ? 'cursor-wait' : ''
              )}
              onClick={handleDeleteAccount}
              disabled={status === 'pending'}
            >
              Yes
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeleteAccountModal;
