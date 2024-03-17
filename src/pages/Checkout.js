import { useState } from 'react';
import { checkoutInputs } from '../utils/formInputs';
import InputControl from '../components/InputControl';
import DeliveryOptionCard from '../components/DeliveryOptionCard';
import OrderItem from '../components/OrderItem';

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas font-medium straps and handle, drawstring top, and front zipper pouch.',
  },
  {
    id: 3,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas  straps and handle, drawstring top, and front zipper pouch.',
  },
];

const deliveryOptions = [
  { type: 'standard', shippingTime: '4-10 business days', shippingCharges: '$5.00' },
  { type: 'express', shippingTime: '2-5 business days', shippingCharges: '$16.00' },
];

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

  const [couponCode, setCouponCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
            <div className='flex gap-5 *:flex-1'>
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

            <div className='flex gap-5 *:flex-1'>
              {checkoutInputs.slice(6, 8).map(input => (
                <InputControl
                  key={input.id}
                  {...input}
                  value={checkoutDetails[input.name]}
                  onChange={handleChange}
                />
              ))}
            </div>

            <div className='flex gap-5 *:flex-1'>
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

          <div className='flex gap-5'>
            {deliveryOptions.map(option => (
              <DeliveryOptionCard
                key={option.type}
                deliveryOption={option}
                deliveryMode={checkoutDetails.deliveryMode}
                handleChange={handleChange}
              />
            ))}
          </div>
        </div>
      </form>

      <section>
        <h2 className='text-xl'>Order summary</h2>

        <div className='mt-6 border border-gray-200 rounded-lg divide-y divide-gray-200'>
          <ul className='divide-y divide-gray-200'>
            {products.map(product => (
              <OrderItem id={product.id} product={product} />
            ))}
          </ul>

          <div className='p-6'>
            <div className='flex flex-col gap-2.5'>
              <label className='font-medium text-gray-500' htmlFor='couponCode'>
                Coupon code
              </label>

              <div className='flex items-center gap-4'>
                <input
                  className='w-full px-3 py-2 ring-1 ring-gray-200 rounded-md shadow focus:ring-2 focus:ring-indigo-500'
                  type='text'
                  id='couponCode'
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                />

                <button className='px-4 py-2 rounded-md ring-1 ring-gray-200 bg-gray-100 font-medium text-gray-500'>
                  Apply
                </button>
              </div>

              {errorMessage && <p className='text-sm text-red-500'>{errorMessage}</p>}
            </div>

            <div className='pt-8 pb-6 space-y-5'>
              <div className='flex justify-between *:text-gray-500'>
                <h3>Subtotal</h3>
                <p className='font-medium'>$600.00</p>
              </div>

              <div className='flex justify-between *:text-gray-500'>
                <h3 className='flex items-center gap-3'>
                  Discount
                  <span className='uppercase text-xs bg-gray-200 px-3 py-1 rounded-full'>
                    cheapskate
                  </span>
                </h3>
                <p className='font-medium'>-$20.00</p>
              </div>

              <div className='flex justify-between *:text-gray-500'>
                <h3>Shipping</h3>
                <p className='font-medium'>$10.00</p>
              </div>

              <div className='flex justify-between *:text-gray-500'>
                <h3>Taxes</h3>
                <p className='font-medium'>$20.00</p>
              </div>
            </div>

            <div className='pt-6 flex justify-between *:text-lg border-t border-gray-200'>
              <h3>Total</h3>
              <p className='font-medium'>$690.00</p>
            </div>
          </div>

          <div className='p-6'>
            <button
              className='w-full block bg-indigo-600 py-3 rounded-md text-white font-medium hover:bg-indigo-700'
              type='submit'
              form='checkout-form'
            >
              Confirm order
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Checkout;
