import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHandleModal } from '../utils/customHooks';
import { deleteAddress } from '../app/slices/addressSlice';
import { RxCross2 } from 'react-icons/rx';
import { MdError } from 'react-icons/md';
import { classNames, handleClickOutside } from '../utils/helpers';

const DeleteAddressModal = ({ closeModal, address, selectedAddress, setSelectedAddress }) => {
  const {
    id,
    fullname,
    phoneNo,
    line1,
    line2,
    country,
    state,
    city,
    postalCode,
    default: isDefault,
  } = address;

  const defaultAddress = useSelector(state =>
    state.address.addresses.find(address => address.default)
  );
  const [status, setStatus] = useState('idle');
  const dispatch = useDispatch();

  useHandleModal(closeModal);

  const handleDeleteAddress = async () => {
    try {
      setStatus('pending');
      await dispatch(deleteAddress(id)).unwrap();

      if (id === selectedAddress.id) {
        setSelectedAddress(defaultAddress);
      }

      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setStatus('idle');
    }
  };

  return (
    <section
      className='w-screen h-screen fixed top-0 left-0 bg-black/40 flex justify-center items-center z-30'
      onClick={e => handleClickOutside(e, closeModal)}
    >
      <div className='w-96 bg-white rounded-lg'>
        <div className='bg-gray-100 px-6 py-4 rounded-t-lg border-b border-gray-300 flex justify-between items-center'>
          <h2 className='text-lg'>{isDefault ? 'Deletion Failed' : 'Confirm Deletion'}</h2>

          <button className='text-2xl' onClick={closeModal}>
            <RxCross2 />
          </button>
        </div>

        <div className='px-6 py-4'>
          <div className='pb-4 border-b border-gray-200'>
            <h3>{fullname}</h3>

            <div className='mt-1.5 *:text-sm *:leading-normal'>
              <p>
                {line1}, {line2}
              </p>
              <p>
                {city}, {state} {postalCode}
              </p>
              <p>{country}</p>
              <p>Phone no: {phoneNo}</p>
            </div>

            {isDefault ? (
              <p className='mt-3 text-sm flex items-start gap-2 text-red-500'>
                <span className='text-xl'>
                  <MdError />
                </span>{' '}
                You can't delete an address that you have set as default. To delete this address,
                first set another address as default.
              </p>
            ) : (
              <p className='mt-3 text-sm'>
                <span className='font-medium'>Please note:</span> Deleting this address will not
                delete any pending orders being shipped to this address.
              </p>
            )}
          </div>

          <div
            className={classNames('pt-4 flex', isDefault ? 'justify-end' : 'justify-center gap-5')}
          >
            {isDefault ? (
              <button
                className='w-20 py-1 border border-indigo-500 bg-indigo-500 rounded-md text-sm text-white hover:bg-indigo-600'
                onClick={closeModal}
              >
                Cancel
              </button>
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
                    status === 'pending' ? 'cursor-wait' : ''
                  )}
                  onClick={handleDeleteAddress}
                  disabled={status === 'pending'}
                >
                  Yes
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteAddressModal;
