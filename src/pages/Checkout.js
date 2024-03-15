import { useState } from 'react';
import { checkoutInputs } from '../utils/formInputs';
import InputControl from '../components/InputControl';
import DeliveryOptionCard from '../components/DeliveryOptionCard';

const Checkout = () => {
  const [checkoutDetails, setCheckoutDetails] = useState({
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

  const handleChange = e =>
    setCheckoutDetails({ ...checkoutDetails, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    console.log(checkoutDetails);
  };

  return (
    <section className='grid grid-cols-2 gap-16'>
      <form className='divide-y divide-gray-200' id='checkout-form' onSubmit={handleSubmit}>
        <div className='pb-10'>
          <h2 className='text-xl'>Contact information</h2>

          <div className='mt-6 space-y-5'>
            {checkoutInputs.slice(0, 2).map(input => (
              <InputControl
                key={input.id}
                {...input}
                value={checkoutDetails[input.name]}
                onChange={handleChange}
              />
            ))}
          </div>
        </div>

        <div className='py-10'>
          <h2 className='text-xl'>Shipping information</h2>

          <div className='mt-6 space-y-5'>
            <div className='flex gap-5'>
              {checkoutInputs.slice(2, 4).map(input => (
                <InputControl
                  key={input.id}
                  {...input}
                  value={checkoutDetails[input.name]}
                  onChange={handleChange}
                />
              ))}
            </div>

            {checkoutInputs.slice(4, 6).map(input => (
              <InputControl
                key={input.id}
                {...input}
                value={checkoutDetails[input.name]}
                onChange={handleChange}
              />
            ))}

            <div className='flex gap-5'>
              {checkoutInputs.slice(6, 8).map(input => (
                <InputControl
                  key={input.id}
                  {...input}
                  value={checkoutDetails[input.name]}
                  onChange={handleChange}
                />
              ))}
            </div>

            <div className='flex gap-5'>
              {checkoutInputs.slice(8, 10).map(input => (
                <InputControl
                  key={input.id}
                  {...input}
                  value={checkoutDetails[input.name]}
                  onChange={handleChange}
                />
              ))}
            </div>
          </div>
        </div>

        <div className='pt-10'>
          <h2 className='text-xl'>Delivery method</h2>

          {/* <div className='flex gap-5'>
            {['standard', 'express'].map(option => (
              <DeliveryOptionCard
                key={option}
                deliveryOption={option}
                checkoutDetails={checkoutDetails}
                handleChange={handleChange}
              />
            ))}
          </div> */}
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
          type='submit'
          form='checkout-form'
        >
          Confirm order
        </button>
      </section>
    </section>
  );
};

export default Checkout;
