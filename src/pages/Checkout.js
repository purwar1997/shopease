import { useState } from 'react';
import DeliveryOptionCard from '../components/DeliveryOptionCard';

const countries = [
  { name: 'India', value: 'India' },
  { name: 'Israel', value: 'Israel' },
  { name: 'America', value: 'America' },
  { name: 'Canada', value: 'Canada' },
];

const Checkout = () => {
  const [checkoutInfo, setCheckoutInfo] = useState({
    email: '',
    phone: '',
    firstname: '',
    lastname: '',
    address: '',
    apartment: '',
    city: '',
    country: '',
    state: '',
    postalCode: '',
    deliveryMode: 'standard',
  });

  const handleChange = e => setCheckoutInfo({ ...checkoutInfo, [e.target.name]: e.target.value });

  return (
    <section className='grid grid-cols-2 gap-16'>
      <form className='divide-y divide-gray-200'>
        <div className='pb-10'>
          <h2 className='text-xl'>Contact information</h2>

          <div className='mt-6 space-y-5'>
            <div className='flex flex-col items-start gap-2'>
              <label className='font-medium text-gray-500' htmlFor='email'>
                Email address
              </label>

              <input
                className='w-full px-3 py-2 ring-1 ring-gray-300 shadow rounded-md focus:ring-2 focus:ring-indigo-500'
                type='email'
                id='email'
                name='email'
                autoComplete='email'
                value={checkoutInfo.email}
                onChange={handleChange}
              />
            </div>

            <div className='flex flex-col items-start gap-2'>
              <label className='font-medium text-gray-500' htmlFor='phone'>
                Phone
              </label>

              <input
                className='w-full px-3 py-2 ring-1 ring-gray-300 shadow rounded-md focus:ring-2 focus:ring-indigo-500'
                type='tel'
                id='phone'
                name='phone'
                autoComplete='tel'
                value={checkoutInfo.phone}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className='py-10'>
          <h2 className='text-xl'>Shipping information</h2>

          <div className='mt-6 space-y-5'>
            <div className='flex gap-5'>
              <div className='flex-1 flex flex-col items-start gap-2'>
                <label className='font-medium text-gray-500' htmlFor='firstname'>
                  First name
                </label>

                <input
                  className='w-full px-3 py-2 ring-1 ring-gray-300 shadow rounded-md focus:ring-2 focus:ring-indigo-500'
                  type='text'
                  id='firstname'
                  name='firstname'
                  autoComplete='given-name'
                  value={checkoutInfo.firstname}
                  onChange={handleChange}
                />
              </div>

              <div className='flex-1 flex flex-col items-start gap-2'>
                <label className='font-medium text-gray-500' htmlFor='lastname'>
                  Last name
                </label>

                <input
                  className='w-full px-3 py-2 ring-1 ring-gray-300 shadow rounded-md focus:ring-2 focus:ring-indigo-500'
                  type='text'
                  id='lastname'
                  name='lastname'
                  autoComplete='family-name'
                  value={checkoutInfo.lastname}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='flex flex-col items-start gap-2'>
              <label className='font-medium text-gray-500' htmlFor='address'>
                Address
              </label>

              <input
                className='w-full px-3 py-2 ring-1 ring-gray-300 shadow rounded-md focus:ring-2 focus:ring-indigo-500'
                type='text'
                id='address'
                name='address'
                autoComplete='address-line1'
                value={checkoutInfo.address}
                onChange={handleChange}
              />
            </div>

            <div className='flex flex-col items-start gap-2'>
              <label className='font-medium text-gray-500' htmlFor='apartment'>
                Apartment, suite, flat etc.
              </label>

              <input
                className='w-full px-3 py-2 ring-1 ring-gray-300 shadow rounded-md focus:ring-2 focus:ring-indigo-500'
                type='text'
                id='apartment'
                name='apartment'
                autoComplete='address-line2'
                value={checkoutInfo.apartment}
                onChange={handleChange}
              />
            </div>

            <div className='flex gap-5'>
              <div className='flex-1 flex flex-col items-start gap-2'>
                <label className='font-medium text-gray-500' htmlFor='city'>
                  City
                </label>

                <input
                  className='w-full px-3 py-2 ring-1 ring-gray-300 shadow rounded-md focus:ring-2 focus:ring-indigo-500'
                  type='text'
                  id='city'
                  name='city'
                  value={checkoutInfo.city}
                  onChange={handleChange}
                />
              </div>

              <div className='flex-1 flex flex-col items-start gap-2'>
                <label className='font-medium text-gray-500' htmlFor='country'>
                  Country
                </label>

                <select
                  className='w-full px-3 py-2 ring-1 ring-gray-300 shadow rounded-md focus:ring-2 focus:ring-indigo-500'
                  id='country'
                  name='country'
                  autoComplete='country-name'
                  value={checkoutInfo.country}
                  onChange={handleChange}
                >
                  <option value='' disabled hidden />

                  {countries.map(country => (
                    <option key={country.name} value={country.value}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='flex gap-5'>
              <div className='flex-1 flex flex-col items-start gap-2'>
                <label className='font-medium text-gray-500' htmlFor='state'>
                  State / Province
                </label>

                <input
                  className='w-full px-3 py-2 ring-1 ring-gray-300 shadow rounded-md focus:ring-2 focus:ring-indigo-500'
                  type='text'
                  id='state'
                  name='state'
                  value={checkoutInfo.state}
                  onChange={handleChange}
                />
              </div>

              <div className='flex-1 flex flex-col items-start gap-2'>
                <label className='font-medium text-gray-500' htmlFor='postal'>
                  Postal code
                </label>

                <input
                  className='w-full px-3 py-2 ring-1 ring-gray-300 shadow rounded-md focus:ring-2 focus:ring-indigo-500'
                  type='text'
                  id='postal'
                  name='postalCode'
                  autoComplete='postal-code'
                  value={checkoutInfo.postalCode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='pt-10'>
          <h2 className='text-xl'>Delivery method</h2>

          <div className='flex gap-5'>
            {['standard', 'express'].map(option => (
              <DeliveryOptionCard
                key={option}
                deliveryOption={option}
                checkoutInfo={checkoutInfo}
                handleChange={handleChange}
              />
            ))}
          </div>
        </div>
      </form>

      <section>
        <h2 className='text-xl'>Order summary</h2>

        <ul className='mt-4'>
          <li className='py-3.5 flex justify-between border-b border-gray-200'>
            <span>Subtotal</span>
            <span className='font-medium'>$400.00</span>
          </li>

          <li className='py-3.5 flex justify-between border-b border-gray-200'>
            <span>Shipping estimate</span>
            <span className='font-medium'>$10.00</span>
          </li>

          <li className='py-3.5 flex justify-between border-b border-gray-200'>
            <span>Tax estimate</span>
            <span className='font-medium'>$5.00</span>
          </li>
        </ul>

        <div className='mt-4 flex justify-between font-medium'>
          <span>Order total</span>
          <span>$515.00</span>
        </div>

        <button
          className='w-full block bg-indigo-600 py-3 rounded-md text-white font-medium hover:bg-indigo-700'
          onClick={() => console.log(checkoutInfo)}
        >
          Confirm order
        </button>
      </section>
    </section>
  );
};

export default Checkout;
