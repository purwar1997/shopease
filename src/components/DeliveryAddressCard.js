import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import AddressFormModal from './AddressFormModal';

const DeliveryAddressCard = ({ address, deliveryAddress, setDeliveryAddress }) => {
  const {
    id: addressId,
    fullname,
    phoneNo,
    line1,
    line2,
    country,
    state,
    city,
    postalCode,
  } = address;

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const toggleAddressModal = () => setIsAddressModalOpen(!isAddressModalOpen);

  const handleClick = e => {
    e.preventDefault();
    toggleAddressModal();
  };

  return (
    <li>
      <input
        className='peer appearance-none hidden'
        type='radio'
        id={addressId}
        name='address'
        required
        checked={addressId === deliveryAddress}
        value={addressId}
        onChange={e => setDeliveryAddress(e.target.value)}
      />

      <label
        className='px-4 py-3.5 flex justify-between items-start ring-1 ring-gray-300 shadow rounded-md cursor-pointer peer-checked:ring peer-checked:ring-indigo-500'
        htmlFor={addressId}
      >
        <div>
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
        </div>

        <button
          className='text-lg text-gray-400 hover:text-gray-500'
          title='Edit address'
          onClick={handleClick}
        >
          <FaEdit />
        </button>

        {isAddressModalOpen && (
          <AddressFormModal toggleAddressModal={toggleAddressModal} deliveryAddress={address} />
        )}
      </label>
    </li>
  );
};

export default DeliveryAddressCard;
