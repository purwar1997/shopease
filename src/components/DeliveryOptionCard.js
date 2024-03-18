import { FaCircleCheck } from 'react-icons/fa6';

const DeliveryOptionCard = ({ deliveryOption, deliveryMode, setDeliveryMode }) => {
  const { type, shippingTime, shippingCharges } = deliveryOption;

  return (
    <li className='group'>
      <input
        className='appearance-none hidden'
        type='radio'
        id={type}
        name='deliveryMode'
        required
        checked={type === deliveryMode}
        value={type}
        onChange={e => setDeliveryMode(e.target.value)}
      />

      <label
        className='block w-64 px-4 py-3.5 shadow rounded-md cursor-pointer ring-1 ring-gray-300 group-has-[:checked]:ring group-has-[:checked]:ring-indigo-500'
        htmlFor={type}
      >
        <div className='flex justify-between items-start'>
          <div>
            <p className='font-medium capitalize'>{type}</p>
            <p className='mt-1 text-sm'>{shippingTime}</p>
          </div>

          <span className='invisible text-indigo-700 group-has-[:checked]:visible'>
            <FaCircleCheck />
          </span>
        </div>

        <p className='mt-6 text-sm font-medium'>{shippingCharges}</p>
      </label>
    </li>
  );
};

export default DeliveryOptionCard;
