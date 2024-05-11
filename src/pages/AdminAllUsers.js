import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllUsersAsync, fetchAdminsAsync } from '../app/slices/userSlice';
import { USERS_PER_PAGE } from '../utils/constants';
import LoadingSpinner from '../components/LoadingSpinner';
import UserTableItem from '../components/UserTableItem';
import Pagination from '../components/Pagination';

const AdminAllUsers = () => {
  const status = useSelector(state => state.user.allUsersStatus);
  const users = useSelector(state => state.user.allUsers);
  const error = useSelector(state => state.user.allUsersError);
  const userCount = useSelector(state => state.user.userCount);
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({ page: 1, limit: USERS_PER_PAGE });

  useEffect(() => {
    dispatch(fetchAllUsersAsync(pagination));
    dispatch(fetchAdminsAsync());
  }, [dispatch, pagination]);

  if (status === 'idle' || status === 'loading') {
    return <LoadingSpinner />;
  }

  if (error) {
    throw error;
  }

  return (
    <main className='page-height px-12 py-10 flex flex-col'>
      <h1 className='text-3xl text-center'>All users</h1>

      <section className='mt-10 flex-1'>
        <table className='w-full text-left bg-white'>
          <thead className='border-b border-gray-200'>
            <tr className='*:font-medium *:text-gray-700 *:px-5 *:py-4'>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200 text-sm'>
            {users.map(user => (
              <UserTableItem key={user.id} user={user} pagination={pagination} />
            ))}
          </tbody>
        </table>
      </section>

      <Pagination
        pagination={pagination}
        setPagination={setPagination}
        itemsPerPage={USERS_PER_PAGE}
        totalCount={userCount}
      />
    </main>
  );
};

export default AdminAllUsers;
