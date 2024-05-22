import { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { updateOrderStatusAsync } from '../app/slices/orderSlice';
import { selectLoggedInUser } from '../app/slices/userSlice';
import { classNames, capitalizeFirstLetter } from '../utils/helpers';
import OrderStatusModal from './OrderStatusModal';
import DeleteOrderModal from './DeleteOrderModal';

const orderStatusOptions = [
  { label: 'Created', value: 'created' },
  { label: 'Processing', value: 'processing' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
];

const validTransitions = {
  created: ['processing'],
  processing: ['shipped'],
  shipped: ['delivered'],
  delivered: [],
};

const OrderTableItem = memo(({ order, pagination }) => {
  const { id, items, date, amountPaid, status } = order;

  const [orderStatus, setOrderStatus] = useState(status);
  const [requestStatus, setRequestStatus] = useState('idle');
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  const currentStatusIndex = orderStatusOptions.findIndex(option => option.value === status);

  const toggleOrderModal = () => setOpenOrderModal(!openOrderModal);
  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

  const handleUpdateStatus = async e => {
    const newStatus = e.target.value;

    if (!validTransitions[orderStatus].includes(newStatus)) {
      const allowedStatus = validTransitions[orderStatus][0];

      const message = `Error updating order status. ${capitalizeFirstLetter(
        orderStatus
      )} order has to be set to ${allowedStatus} first, only then it can be ${newStatus}.`;

      setErrorMessage(message);
      toggleOrderModal();

      return;
    }

    try {
      setOrderStatus(newStatus);
      setRequestStatus('pending');
      await dispatch(updateOrderStatusAsync({ id, status: e.target.value, user })).unwrap();
    } catch (message) {
      setOrderStatus(status);
      console.log(message);
    } finally {
      setRequestStatus('idle');
    }
  };

  return (
    <tr className='*:px-5 *:py-4 hover:bg-gray-50'>
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
            className={classNames(
              'w-[88px] bg-transparent',
              requestStatus === 'pending' ? 'cursor-wait' : ''
            )}
            id='table'
            value={orderStatus}
            onChange={handleUpdateStatus}
            disabled={requestStatus === 'pending'}
          >
            {orderStatusOptions.map((option, index) => (
              <option key={option.label} value={option.value} disabled={index < currentStatusIndex}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        {openOrderModal && (
          <OrderStatusModal closeModal={toggleOrderModal} errorMessage={errorMessage} />
        )}
      </td>
      <td>
        <div className='flex gap-6'>
          <Link className='text-indigo-500 font-medium' to={`${id}`}>
            View
          </Link>

          <button
            className='text-indigo-500 font-medium focus-visible:outline-none'
            onClick={toggleDeleteModal}
          >
            Delete
          </button>
        </div>

        {openDeleteModal && (
          <DeleteOrderModal
            closeModal={toggleDeleteModal}
            orderId={id}
            pagination={pagination}
            user={user}
          />
        )}
      </td>
    </tr>
  );
});

export default OrderTableItem;
