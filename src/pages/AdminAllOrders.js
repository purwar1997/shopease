import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllOrdersAsync } from '../app/slices/orderSlice';
import { ORDERS_PER_PAGE } from '../utils/constants';
import LoadingSpinner from '../components/LoadingSpinner';
import OrderTableItem from '../components/OrderTableItem';
import Pagination from '../components/Pagination';

const AdminAllOrders = () => {
  const status = useSelector(state => state.order.allOrdersStatus);
  const orders = useSelector(state => state.order.allOrders);
  const error = useSelector(state => state.order.allOrdersError);
  const orderCount = useSelector(state => state.order.allOrdersCount);
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({ page: 1, limit: ORDERS_PER_PAGE });

  useEffect(() => {
    dispatch(fetchAllOrdersAsync(pagination));
  }, [dispatch, pagination]);

  if (status === 'idle' || status === 'loading') {
    return <LoadingSpinner />;
  }

  if (error) {
    throw error;
  }

  return (
    <main className='page-height px-12 py-10 bg-gray-50'>
      <h1 className='text-3xl text-center'>All orders</h1>

      <section className='mt-10'>
        <table className='w-full text-left bg-white'>
          <thead className='border-b border-gray-200'>
            <tr className='*:font-medium *:text-gray-700 *:px-5 *:py-4'>
              <th>Order Id</th>
              <th>Items</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200 text-sm'>
            {orders.map(order => (
              <OrderTableItem key={order.id} order={order} />
            ))}
          </tbody>
        </table>

        <Pagination
          pagination={pagination}
          setPagination={setPagination}
          itemsPerPage={ORDERS_PER_PAGE}
          totalCount={orderCount}
        />
      </section>
    </main>
  );
};

export default AdminAllOrders;
