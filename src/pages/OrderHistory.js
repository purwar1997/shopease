import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectLoggedInUser } from '../app/slices/userSlice';
import { fetchUserOrdersAsync } from '../app/slices/orderSlice';
import { formatDate } from '../utils/helpers';
import OrderHistoryItem from '../components/OrderHistoryItem';
import NoOrderPlaced from '../pages/NoOrderPlaced';
import LoadingSpinner from '../components/LoadingSpinner';

const OrderHistory = () => {
  const status = useSelector(state => state.order.status);
  const orders = useSelector(state => state.order.orders);
  const error = useSelector(state => state.order.error);
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchUserOrdersAsync(user.id));
    }
  }, [dispatch, user]);

  if (status === 'idle' || status === 'loading') {
    return <LoadingSpinner />;
  }

  if (error) {
    throw error;
  }

  if (orders.length === 0) {
    return <NoOrderPlaced />;
  }

  return (
    <main className='page-height px-12 py-10'>
      <h1 className='text-3xl text-center'>Order history</h1>

      <section className='mt-10'>
        <ul className='space-y-8'>
          {orders.toReversed().map(order => (
            <li className='border border-gray-200 rounded-lg' key={order.id}>
              <header className='px-6 py-4 flex justify-between items-center border-b border-gray-200 bg-gray-50 rounded-t-lg'>
                <div className='flex gap-14'>
                  <div>
                    <h3>Order number</h3>
                    <p className='mt-1 text-sm'>#{order.id}</p>
                  </div>

                  <div>
                    <h3>Date placed</h3>
                    <p className='mt-1 text-sm'>{formatDate(order.date)}</p>
                  </div>

                  <div>
                    <h3>Total amount</h3>
                    <p className='mt-1 text-sm'>₹{order.total}</p>
                  </div>
                </div>

                <Link className='text-indigo-500 font-medium' to={`${order.id}`}>
                  View Order
                </Link>
              </header>

              <ul className='divide-y divide-gray-200'>
                {order.items.map(item => (
                  <OrderHistoryItem
                    key={item.id}
                    orderItem={item}
                    orderStatus={order.status}
                    date={order.date}
                    userId={user.id}
                  />
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default OrderHistory;
