import { RxCross2 } from 'react-icons/rx';
import { MdError } from 'react-icons/md';
import { useHandleModal } from '../utils/customHooks';
import { handleClickOutside } from '../utils/helpers';

const OrderStatusModal = ({ closeModal, errorMessage }) => {
  useHandleModal(closeModal);

  return (
    <div
      className='w-screen h-screen fixed top-0 left-0 bg-black/40 flex justify-center items-center z-30'
      onClick={e => handleClickOutside(e, closeModal)}
    >
      <section className='w-96 bg-white rounded-lg'>
        <header className='bg-gray-100 px-6 py-4 rounded-t-lg border-b border-gray-300 flex justify-between items-center'>
          <h2 className='text-lg'>Update status</h2>

          <button className='text-2xl' onClick={closeModal}>
            <RxCross2 />
          </button>
        </header>

        <div className='px-6 py-4'>
          <div className='flex items-start gap-2.5 *:text-red-500'>
            <span className='relative text-xl top-px'>
              <MdError />
            </span>

            <p className='text-base'>{errorMessage}</p>
          </div>

          <div className='mt-5 pt-5 border-t border-gray-200 flex justify-end'>
            <button
              className='w-20 py-1 border border-indigo-500 bg-indigo-500 rounded-md text-white text-sm hover:bg-indigo-600'
              onClick={closeModal}
            >
              Ok
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderStatusModal;
