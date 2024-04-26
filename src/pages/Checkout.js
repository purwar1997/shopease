import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import { selectCartItems, clearCartAsync } from '../app/slices/cartSlice';
import { selectLoggedInUser } from '../app/slices/userSlice';
import {
  fetchAddressesAsync,
  selectAddresses,
  selectDefaultAddress,
} from '../app/slices/addressSlice';
import { createNewOrderAsync } from '../app/slices/orderSlice';
import { classNames } from '../utils/helpers';
import AddAddressModal from '../components/AddAddressModal';
import DeliveryAddressCard from '../components/DeliveryAddressCard';
import DeliveryOptionCard from '../components/DeliveryOptionCard';
import OrderItem from '../components/OrderItem';
import ButtonLoader from '../components/ButtonLoader';

const deliveryOptions = [
  {
    type: 'standard',
    shippingTime: '4-10 business days',
    shippingCharges: 30,
    default: true,
  },
  {
    type: 'express',
    shippingTime: '2-5 business days',
    shippingCharges: 100,
    default: false,
  },
];

const paymentMethods = ['cash', 'razorpay', 'stripe'];

const Checkout = () => {
  const addresses = useSelector(selectAddresses);
  const defaultAddress = useSelector(selectDefaultAddress);
  const user = useSelector(selectLoggedInUser);
  const status = useSelector(state => state.cart.status);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(
    deliveryOptions.find(option => option.default)
  );

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Cash');
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState(null);
  const [createOrderStatus, setCreateOrderStatus] = useState('idle');

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(fetchAddressesAsync(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (defaultAddress) {
      setSelectedAddress(defaultAddress);
    }
  }, [defaultAddress]);

  const addressList = useMemo(
    () =>
      addresses.length
        ? [
            addresses.find(address => address.default),
            ...addresses.filter(address => !address.default),
          ]
        : [],
    [addresses]
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((amount, item) => amount + item.product.price * item.quantity, 0),
    [cartItems]
  );

  const toggleAddressModal = () => setOpenAddressModal(!openAddressModal);

  const handleCreateOrder = async () => {
    try {
      setCreateOrderStatus('pending');

      const order = {
        items: cartItems,
        deliveryAddress: selectedAddress,
        deliveryType: selectedDeliveryOption.type,
        paymentMethod: selectedPaymentMethod,
        paymentDetails: {
          cardNo: '4444-4444-4444',
          cardExpiry: '12/28',
          cvv: '512',
          cardHolderName: 'Shubham Purwar',
        },
        total: cartTotal,
        shippingCharges: selectedDeliveryOption.shippingCharges,
        tax: 20,
        amountPaid: cartTotal + selectedDeliveryOption.shippingCharges + 20,
        status: 'created',
        date: new Date().toISOString(),
      };

      const newOrder = await dispatch(createNewOrderAsync({ order, userId: user.id })).unwrap();
      await dispatch(clearCartAsync(cartItems.map(item => item.id))).unwrap();
      navigate(`/orders/${newOrder.id}`, { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      setCreateOrderStatus('idle');
    }
  };

  if (status === 'succeded' && cartItems.length === 0) {
    return <Navigate to='/' replace={true} />;
  }

  return (
    <section className='grid grid-cols-2 gap-12'>
      <section className='divide-y divide-gray-200'>
        <div className='pb-10'>
          <h2 className='text-xl'>Your addresses</h2>

          <ul className='mt-6 space-y-5'>
            {addressList.map(address => (
              <DeliveryAddressCard
                key={address.id}
                address={address}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
              />
            ))}
          </ul>

          <button
            className='mt-6 font-medium text-indigo-500 hover:text-indigo-600 flex items-center gap-2 focus-visible:outline-none'
            onClick={toggleAddressModal}
          >
            <FaPlus />
            <span>Add new address</span>
          </button>

          {openAddressModal && (
            <AddAddressModal
              closeModal={toggleAddressModal}
              setSelectedAddress={setSelectedAddress}
            />
          )}
        </div>

        <div className='py-10'>
          <h2 className='text-xl'>Delivery method</h2>

          <ul className='mt-6 flex gap-5'>
            {deliveryOptions.map(option => (
              <DeliveryOptionCard
                key={option.type}
                option={option}
                selectedOption={selectedDeliveryOption}
                setSelectedOption={setSelectedDeliveryOption}
              />
            ))}
          </ul>
        </div>

        <div className='pt-10'>
          <h2 className='text-xl'>Payment Method</h2>

          <ul className='mt-6 flex gap-8'>
            {paymentMethods.map(method => (
              <li className='flex items-center gap-2.5' key={method}>
                <input
                  type='radio'
                  id={method}
                  name='paymentMethod'
                  defaultChecked={method === 'cash'}
                  value={method}
                  onChange={e => setSelectedPaymentMethod(e.target.value)}
                />

                <label className='capitalize' htmlFor={method}>
                  {method}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className='text-xl'>Order summary</h2>

        <div className='mt-6 border border-gray-200 rounded-lg divide-y divide-gray-200'>
          <ul className='divide-y divide-gray-200'>
            {cartItems.toReversed().map(item => (
              <OrderItem
                key={item.id}
                id={item.id}
                product={item.product}
                quantity={item.quantity}
              />
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

                <button className='px-4 py-2 rounded-md ring-1 ring-gray-300 bg-gray-100 font-medium text-gray-500'>
                  Apply
                </button>
              </div>

              {couponError && <p className='text-sm text-red-500'>{couponError}</p>}
            </div>

            <div className='pt-8 pb-6 space-y-5'>
              <div className='flex justify-between *:text-gray-500'>
                <h3>Subtotal</h3>
                <p className='font-medium'>₹{cartTotal}</p>
              </div>

              <div className='flex justify-between *:text-gray-500'>
                <h3 className='flex items-center gap-3'>
                  Discount
                  <span className='uppercase text-xs bg-gray-200 px-3 py-1 rounded-full'>
                    cheapskate
                  </span>
                </h3>
                <p className='font-medium'>-₹20</p>
              </div>

              <div className='flex justify-between *:text-gray-500'>
                <h3>Shipping</h3>
                <p className='font-medium'>₹{selectedDeliveryOption.shippingCharges}</p>
              </div>

              <div className='flex justify-between *:text-gray-500'>
                <h3>Taxes</h3>
                <p className='font-medium'>₹20</p>
              </div>
            </div>

            <div className='pt-6 flex justify-between *:text-lg border-t border-gray-200'>
              <h3>Total</h3>
              <p className='font-medium'>
                ₹{cartTotal + selectedDeliveryOption.shippingCharges + 20}
              </p>
            </div>
          </div>

          <div className='p-6'>
            <button
              className={classNames(
                'w-full h-12 bg-indigo-600 rounded-md text-white font-medium hover:bg-indigo-700 flex justify-center items-center',
                createOrderStatus === 'pending' ? 'cursor-wait' : ''
              )}
              onClick={handleCreateOrder}
              disabled={createOrderStatus === 'pending'}
            >
              {createOrderStatus === 'pending' ? <ButtonLoader /> : 'Confirm Order'}
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Checkout;
