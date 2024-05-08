import { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { updateOrderStatusAsync } from '../app/slices/orderSlice';
import { selectLoggedInUser } from '../app/slices/userSlice';
import { classNames } from '../utils/helpers';

const orderStatusOptions = [
  { label: 'Created', value: 'created' },
  { label: 'Processing', value: 'processing' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
];

const OrderTableItem = memo(({ order }) => {
  const { id, items, date, amountPaid, status } = order;

  const [orderStatus, setOrderStatus] = useState(status);
  const [requestStatus, setRequestStatus] = useState('idle');
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  const optionIndex = orderStatusOptions.findIndex(option => option.value === status);

  const handleUpdateStatus = async e => {
    setOrderStatus(e.target.value);

    try {
      setRequestStatus('pending');
      await dispatch(updateOrderStatusAsync({ user, id, status: e.target.value })).unwrap();
    } catch (error) {
      setOrderStatus(status);
      console.log(error);
    } finally {
      setRequestStatus('idle');
    }
  };

  return (
    <tr className='*:px-5 *:py-4'>
      <td>#{id}</td>
      <td>
        <ul className='space-y-1'>
          {items.map(item => (
            <li key={item.product.id}>{item.product.title}</li>
          ))}
        </ul>
      </td>
      <td>{format(date, 'dd/MM/yy')}</td>
      <td>₹{amountPaid}</td>
      <td>
        {status === 'delivered' ? (
          <span className='capitalize'>{status}</span>
        ) : (
          <select
            className={classNames('w-[88px]', requestStatus === 'pending' ? 'cursor-wait' : '')}
            id='order-status'
            value={orderStatus}
            onChange={handleUpdateStatus}
            disabled={requestStatus === 'pending'}
          >
            {orderStatusOptions.map((option, index) => (
              <option key={option.label} value={option.value} disabled={index < optionIndex}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </td>
      <td>
        <button className='text-indigo-500 font-medium'>Delete</button>
      </td>
    </tr>
  );
});

export default OrderTableItem;
