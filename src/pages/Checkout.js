import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import AddressFormModal from '../components/AddressFormModal';
import DeliveryAddressCard from '../components/DeliveryAddressCard';
import DeliveryOptionCard from '../components/DeliveryOptionCard';
import OrderItem from '../components/OrderItem';

const addresses = [
  {
    id: '1',
    fullname: 'Shubham Purwar',
    phoneNo: '9897887871',
    line1: 'Khatkhata Baba Colony',
    line2: 'Ram Leela Maidan',
    landmark: 'Near royal enfield showroom',
    country: 'India',
    state: 'Uttar Pradesh',
    city: 'Etawah',
    postalCode: '206001',
    isDefault: true,
  },
  {
    id: '2',
    fullname: 'Suyash Purwar',
    phoneNo: '6392615062',
    line1: 'Eastland Citadel, Second Floor, Checkpost',
    line2: '102, Hosur Rd, Kaveri Layout',
    landmark: 'Near hackerrank office',
    country: 'India',
    state: 'Karnataka',
    city: 'Bangalore Urban',
    postalCode: '906712',
    isDefault: false,
  },
];

const deliveryOptions = [
  {
    type: 'standard',
    shippingTime: '4-10 business days',
    shippingCharges: '$5.00',
    isDefault: true,
  },
  {
    type: 'express',
    shippingTime: '2-5 business days',
    shippingCharges: '$16.00',
    isDefault: false,
  },
];

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

const Checkout = () => {
  const [deliveryAddress, setDeliveryAddress] = useState(
    addresses.find(address => address.isDefault).id
  );

  const [deliveryMode, setDeliveryMode] = useState(
    deliveryOptions.find(option => option.isDefault).type
  );

  const [couponApplied, setCouponApplied] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const toggleAddressModal = () => setIsAddressModalOpen(!isAddressModalOpen);

  return (
    <section className='grid grid-cols-2 gap-12'>
      <section className='divide-y divide-gray-200'>
        <div className='pb-10'>
          <h2 className='text-xl'>Your addresses</h2>

          <ul className='mt-6 space-y-5'>
            {addresses.map(address => (
              <DeliveryAddressCard
                key={address.id}
                address={address}
                deliveryAddress={deliveryAddress}
                setDeliveryAddress={setDeliveryAddress}
              />
            ))}
          </ul>

          <button
            className='mt-6 font-medium text-indigo-500 hover:text-indigo-600 flex items-center gap-2'
            onClick={toggleAddressModal}
          >
            <FaPlus />
            <span>Add new address</span>
          </button>

          {isAddressModalOpen && <AddressFormModal toggleAddressModal={toggleAddressModal} />}
        </div>

        <div className='pt-10'>
          <h2 className='text-xl'>Delivery method</h2>

          <ul className='mt-6 flex gap-5'>
            {deliveryOptions.map(option => (
              <DeliveryOptionCard
                key={option.type}
                deliveryOption={option}
                deliveryMode={deliveryMode}
                setDeliveryMode={setDeliveryMode}
              />
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className='text-xl'>Order summary</h2>

        <div className='mt-6 border border-gray-200 rounded-lg divide-y divide-gray-200'>
          <ul className='divide-y divide-gray-200'>
            {products.map(product => (
              <OrderItem key={product.id} product={product} />
            ))}
          </ul>

          <div className='p-6'>
            <div className='flex flex-col gap-2.5'>
              <label className='font-medium text-gray-500 self-start' htmlFor='couponCode'>
                Coupon code
              </label>

              <div className='flex items-center gap-4'>
                <input
                  className='w-full px-3 py-2 ring-1 ring-gray-300 rounded-md shadow focus:ring-2 focus:ring-indigo-500'
                  type='text'
                  id='couponCode'
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                />

                <button
                  className='px-4 py-2 rounded-md ring-1 ring-gray-300 bg-gray-100 font-medium text-gray-500'
                  onClick={() => setCouponApplied(couponCode)}
                >
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
            <button className='w-full block bg-indigo-600 py-3 rounded-md text-white font-medium hover:bg-indigo-700'>
              Confirm order
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Checkout;
