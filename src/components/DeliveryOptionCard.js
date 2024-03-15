import { FaCircleCheck } from 'react-icons/fa6';
import { classNames } from '../utils/helpers';

const DeliveryOptionCard = ({ deliveryOption, deliveryMode, handleChange }) => {
  const { type, shippingTime, shippingCharges } = deliveryOption;

  return (
    <div>
      <input
        className='appearance-none'
        type='radio'
        id={type}
        name='deliveryMode'
        required
        value={type}
        onChange={handleChange}
      />
      <label
        className={classNames(
          'block w-64 px-4 py-3.5 shadow rounded-md cursor-pointer',
          deliveryMode === type ? 'ring ring-indigo-500' : 'ring-1 ring-gray-300'
        )}
        htmlFor={type}
      >
        <div className='flex justify-between items-start'>
          <div>
            <p className='font-medium capitalize'>{type}</p>
            <p className='mt-1 text-sm'>{shippingTime}</p>
          </div>

          {deliveryMode === type && (
            <span className='text-indigo-700'>
              <FaCircleCheck />
            </span>
          )}
        </div>

        <p className='mt-6 text-sm font-medium'>{shippingCharges}</p>
      </label>
    </div>
  );
};

export default DeliveryOptionCard;
