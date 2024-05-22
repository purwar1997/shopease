import { FaCircleCheck } from 'react-icons/fa6';
import { classNames } from '../services';

const DeliveryOptionCard = ({ option, selectedOption, setSelectedOption }) => {
  const { type, shippingTime, shippingCharges } = option;

  return (
    <li
      className={classNames(
        'w-64 px-4 py-3.5 shadow rounded-md cursor-pointer',
        type === selectedOption.type ? 'ring ring-indigo-500' : 'ring-1 ring-gray-300'
      )}
      onClick={() => setSelectedOption(option)}
    >
      <div className='flex justify-between items-start'>
        <div>
          <h3 className='capitalize'>{type}</h3>
          <p className='mt-1 text-sm'>{shippingTime}</p>
        </div>

        <span className='invisible text-indigo-700 group-has-[:checked]:visible'>
          <FaCircleCheck />
        </span>
      </div>

      <p className='mt-6 text-sm font-medium'>₹{shippingCharges}</p>
    </li>
  );
};

export default DeliveryOptionCard;
