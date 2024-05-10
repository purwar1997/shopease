import { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { updateOrderStatusAsync } from '../app/slices/orderSlice';
import { selectLoggedInUser } from '../app/slices/userSlice';
import { classNames } from '../utils/helpers';
import DeleteOrderModal from './DeleteOrderModal';

const orderStatusOptions = [
  { label: 'Created', value: 'created' },
  { label: 'Processing', value: 'processing' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
];

const OrderTableItem = memo(({ order, pagination }) => {
  const { id, items, date, amountPaid, status } = order;

  const [orderStatus, setOrderStatus] = useState(status);
  const [requestStatus, setRequestStatus] = useState('idle');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  const optionIndex = orderStatusOptions.findIndex(option => option.value === status);

  const handleUpdateStatus = async e => {
    setOrderStatus(e.target.value);

    try {
      setRequestStatus('pending');
      await dispatch(updateOrderStatusAsync({ id, status: e.target.value, user })).unwrap();
    } catch (error) {
      setOrderStatus(status);
      console.log(error);
    } finally {
      setRequestStatus('idle');
    }
  };

  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

  return (
    <>
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
          <div className='flex gap-6'>
            <Link className='text-indigo-500 font-medium' to={`/orders/${id}`}>
              View
            </Link>

            <button
              className='text-indigo-500 font-medium focus-visible:outline-none'
              onClick={toggleDeleteModal}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>

      {openDeleteModal && (
        <DeleteOrderModal
          closeModal={toggleDeleteModal}
          orderId={id}
          pagination={pagination}
          user={user}
        />
      )}
    </>
  );
});

export default OrderTableItem;
