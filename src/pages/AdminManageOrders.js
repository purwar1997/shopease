import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaArrowDownLong, FaArrowUpLong } from 'react-icons/fa6';
import { fetchAllOrdersAsync } from '../app/slices/orderSlice';
import { ORDERS_PER_PAGE } from '../utils/constants';
import LoadingSpinner from '../components/LoadingSpinner';
import OrderTableItem from '../components/OrderTableItem';
import Pagination from '../components/Pagination';

const AdminManageOrders = () => {
  const status = useSelector(state => state.order.allOrdersStatus);
  const orders = useSelector(state => state.order.allOrders);
  const error = useSelector(state => state.order.allOrdersError);
  const orderCount = useSelector(state => state.order.orderCount);
  const dispatch = useDispatch();

  const [sort, setSort] = useState({});
  const [pagination, setPagination] = useState({ page: 1, limit: ORDERS_PER_PAGE });

  useEffect(() => {
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, sort, pagination]);

  const handleSort = sortBy => {
    setSort({ sortBy, order: sort.order === 'asc' ? 'desc' : 'asc' });
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (error) {
    throw error;
  }

  return (
    <main className='page-height px-12 py-10 flex flex-col'>
      <h1 className='text-3xl text-center'>Orders</h1>

      <section className='mt-10 flex-1'>
        <table className='w-full text-left bg-white'>
          <thead className='border-b border-gray-200'>
            <tr className='*:font-medium *:text-gray-700 *:px-5 *:py-4'>
              <th>Order Id</th>
              <th>Items</th>
              <th>Date</th>
              <th>
                <div
                  className='flex items-baseline gap-2.5 cursor-pointer'
                  onClick={() => handleSort('amountPaid')}
                >
                  <span>Total</span>

                  <span className='text-sm'>
                    {(!sort.order && <FaArrowUpLong />) ||
                      (sort.order === 'asc' ? <FaArrowUpLong /> : <FaArrowDownLong />)}
                  </span>
                </div>
              </th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200 text-sm'>
            {orders.map(order => (
              <OrderTableItem key={order.id} order={order} pagination={pagination} />
            ))}
          </tbody>
        </table>
      </section>

      <Pagination
        pagination={pagination}
        setPagination={setPagination}
        itemsPerPage={ORDERS_PER_PAGE}
        totalCount={orderCount}
      />
    </main>
  );
};

export default AdminManageOrders;
