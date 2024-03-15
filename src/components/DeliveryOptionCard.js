import { FaCircleCheck } from 'react-icons/fa6';
import { classNames } from '../utils/helpers';

const DeliveryOptionCard = ({ deliveryOption, checkoutInfo, handleChange }) => {
  return (
    <div>
      <input
        className='appearance-none'
        type='radio'
        id={deliveryOption}
        name='deliveryMode'
        required
        value={deliveryOption}
        onChange={handleChange}
      />
      <label
        className={classNames(
          'block w-64 px-4 py-3.5 shadow rounded-md cursor-pointer',
          checkoutInfo.deliveryMode === deliveryOption
            ? 'ring ring-indigo-500'
            : 'ring-1 ring-gray-300'
        )}
        htmlFor={deliveryOption}
      >
        <div className='flex justify-between items-start'>
          <div>
            <p className='font-medium'>Express</p>
            <p className='mt-1 text-sm'>2-5 business days</p>
          </div>

          {checkoutInfo.deliveryMode === deliveryOption && (
            <span className='text-indigo-700'>
              <FaCircleCheck />
            </span>
          )}
        </div>

        <p className='mt-6 text-sm font-medium'>$16.00</p>
      </label>
    </div>
  );
};

export default DeliveryOptionCard;
