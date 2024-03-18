import { useState, useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { addressInputs } from '../utils/formInputs';
import InputControl from './InputControl';

const AddressFormModal = ({ toggleAddressModal, deliveryAddress }) => {
  const { fullname, phoneNo, line1, line2, landmark, country, state, city, postalCode, isDefault } =
    deliveryAddress || {};

  const [address, setAddress] = useState({
    fullname,
    phoneNo,
    line1,
    line2,
    landmark,
    country,
    state,
    city,
    postalCode,
    isDefault: isDefault || false,
  });

  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => document.body.classList.remove('overflow-hidden');
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setAddress({ ...address, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    toggleAddressModal();
  };

  const handleClickOutside = e => {
    if (e.target === e.currentTarget) {
      toggleAddressModal();
    }
  };

  return (
    <section
      className='fixed top-0 left-0 w-screen h-screen bg-black/40 flex justify-center items-center'
      onClick={handleClickOutside}
    >
      <div className='w-[640px] bg-white rounded-lg'>
        <div className='bg-gray-100 px-6 py-4 rounded-t-lg border-b border-gray-300 flex justify-between items-center'>
          <h2 className='text-lg'>
            {deliveryAddress ? 'Update your shipping address' : 'Enter a new delivery address'}
          </h2>

          <button className='text-2xl' onClick={toggleAddressModal}>
            <RxCross2 />
          </button>
        </div>

        <form className='max-h-[500px] overflow-auto' onSubmit={handleSubmit}>
          <div className='px-6 py-5 space-y-4'>
            {addressInputs.slice(0, 5).map(input => (
              <InputControl
                key={input.id}
                {...input}
                value={address[input.name]}
                onChange={handleChange}
              />
            ))}

            <div className='flex gap-5'>
              {addressInputs.slice(5, 7).map(input => (
                <InputControl
                  key={input.id}
                  {...input}
                  value={address[input.name]}
                  onChange={handleChange}
                />
              ))}
            </div>

            <div className='flex gap-5'>
              {addressInputs.slice(7).map(input => (
                <InputControl
                  key={input.id}
                  {...input}
                  value={address[input.name]}
                  onChange={handleChange}
                />
              ))}
            </div>

            <div className='flex gap-2'>
              <input
                type='checkbox'
                name='isDefault'
                id='default'
                checked={address.isDefault}
                onChange={handleChange}
              />
              <label htmlFor='default'>Make this my default address</label>
            </div>
          </div>

          <div className='px-6 pt-2 pb-6'>
            <button
              className='block w-full bg-indigo-600 py-2.5 rounded-md text-white font-medium hover:bg-indigo-700'
              type='submit'
            >
              Use this address
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddressFormModal;
