import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAsDefaultAsync } from '../app/slices/addressSlice';
import DeleteAddressModal from './DeleteAddressModal';

const AddressCard = memo(({ address }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [status, setStatus] = useState('idle');
  const dispatch = useDispatch();

  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

  const handleSetAsDefault = async () => {
    try {
      setStatus('pending');
      await dispatch(setAsDefaultAsync(address.id)).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setStatus('idle');
    }
  };

  return (
    <li className='w-80 h-64 border border-gray-300 rounded-lg shadow-md flex flex-col'>
      {address.default && (
        <div className='h-10 px-5 text-sm border-b border-gray-300 flex items-center'>
          Default addresss
        </div>
      )}

      <div className='px-5 py-3 flex-1 flex flex-col justify-between'>
        <div>
          <h3>{address.fullname}</h3>

          <div className='mt-2 *:text-sm *:text-gray-900 *:leading-normal'>
            <p>{address.line1}</p>
            {address.line2 && <p>{address.line2}</p>}
            <p>
              {address.city}, {address.state} {address.postalCode}
            </p>
            <p>{address.country}</p>
            <p>Phone no: {address.phoneNo}</p>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <Link className='text-sm text-indigo-700 hover:underline' to={`${address.id}/edit`}>
            Edit
          </Link>

          <span className='w-px h-3.5 bg-gray-400' />

          <button
            className='text-sm text-indigo-700 hover:underline focus-visible:outline-none'
            onClick={toggleDeleteModal}
          >
            Delete
          </button>

          {!address.default && (
            <>
              <span className='w-px h-3.5 bg-gray-400' />

              <button
                className='text-sm text-indigo-700 hover:underline'
                onClick={handleSetAsDefault}
                disabled={status === 'pending'}
              >
                Set as default
              </button>
            </>
          )}
        </div>
      </div>

      {openDeleteModal && <DeleteAddressModal closeModal={toggleDeleteModal} address={address} />}
    </li>
  );
});

export default AddressCard;
