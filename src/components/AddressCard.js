import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAsDefaultAsync } from '../app/slices/addressSlice';
import { selectLoggedInUser } from '../app/slices/userSlice';
import DeleteAddressModal from './DeleteAddressModal';

const AddressCard = memo(({ address }) => {
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

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [status, setStatus] = useState('idle');

  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

  const handleSetAsDefault = async () => {
    try {
      setStatus('pending');
      await dispatch(setAsDefaultAsync({ id, userId: user.id })).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setStatus('idle');
    }
  };

  return (
    <li className='w-80 h-64 border border-gray-300 rounded-lg shadow-md flex flex-col'>
      {isDefault && (
        <div className='h-10 px-5 text-sm border-b border-gray-300 flex items-center'>
          Default addresss
        </div>
      )}

      <div className='px-5 py-3 flex-1 flex flex-col justify-between'>
        <div>
          <h3>{fullname}</h3>

          <div className='mt-2 *:text-sm *:text-gray-900 *:leading-normal'>
            <p>{line1}</p>
            {line2 && <p>{line2}</p>}
            <p>
              {city}, {state} {postalCode}
            </p>
            <p>{country}</p>
            <p>Phone no: {phoneNo}</p>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <Link className='text-sm text-indigo-700 hover:underline' to={`${id}/edit`}>
            Edit
          </Link>

          <span className='w-px h-3.5 bg-gray-400' />

          <button
            className='text-sm text-indigo-700 hover:underline focus-visible:outline-none'
            onClick={toggleDeleteModal}
          >
            Delete
          </button>

          {!isDefault && (
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
