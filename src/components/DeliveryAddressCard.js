import { useState, memo } from 'react';
import { FaEdit } from 'react-icons/fa';
import { BsTrash3Fill } from 'react-icons/bs';
import { classNames } from '../services';
import UpdateAddressModal from './UpdateAddressModal';
import DeleteAddressModal from './DeleteAddressModal';

const DeliveryAddressCard = memo(({ address, selectedAddress, setSelectedAddress }) => {
  const {
    id,
    fullname,
    line1,
    line2,
    country,
    state,
    city,
    postalCode,
    default: isDefault,
  } = address;

  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const toggleAddressModal = () => setOpenAddressModal(!openAddressModal);
  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

  const handleClick = (e, action) => {
    e.stopPropagation();

    if (action === 'edit') {
      toggleAddressModal();
    } else {
      toggleDeleteModal();
    }
  };

  return (
    <li
      className={classNames(
        'px-4 py-3.5 flex justify-between items-start shadow rounded-md cursor-pointer',
        id === selectedAddress?.id ? 'ring ring-indigo-500' : 'ring-1 ring-gray-300'
      )}
      onClick={() => setSelectedAddress(address)}
    >
      <div>
        <h3>
          {fullname} {isDefault && <span className='font-normal text-sm'>(Default)</span>}
        </h3>

        <div className='mt-1.5 *:text-sm *:leading-normal'>
          <p>
            {line1}, {line2}
          </p>
          <p>
            {city}, {state} {postalCode}
          </p>
          <p>{country}</p>
        </div>
      </div>

      <div className='flex items-center gap-3.5'>
        <button
          className='text-lg text-gray-400 hover:text-gray-500 focus-visible:outline-none'
          title='Edit address'
          onClick={e => handleClick(e, 'edit')}
        >
          <FaEdit />
        </button>

        <button
          className='text-lg text-gray-400 hover:text-gray-500 focus-visible:outline-none'
          title='Delete address'
          onClick={e => handleClick(e, 'delete')}
        >
          <BsTrash3Fill />
        </button>
      </div>

      {openAddressModal && (
        <UpdateAddressModal
          closeModal={toggleAddressModal}
          deliveryAddress={address}
          setSelectedAddress={setSelectedAddress}
        />
      )}

      {openDeleteModal && (
        <DeleteAddressModal
          closeModal={toggleDeleteModal}
          address={address}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
      )}
    </li>
  );
});

export default DeliveryAddressCard;
