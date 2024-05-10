import { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserRoleAsync } from '../app/slices/userSlice';
import { selectLoggedInUser } from '../app/slices/userSlice';
import { classNames } from '../utils/helpers';
import DeleteUserModal from './DeleteUserModal';

const roles = [
  { label: 'User', value: 'user' },
  { label: 'Admin', value: 'admin' },
];

const UserTableItem = memo(({ user, pagination }) => {
  const { id, firstname, lastname, email, phoneNo, role } = user;

  const [userRole, setUserRole] = useState(role);
  const [status, setStatus] = useState('idle');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  const handleUpdateRole = async e => {
    setUserRole(e.target.value);

    try {
      setStatus('pending');

      await dispatch(
        updateUserRoleAsync({ id, role: e.target.value, user: loggedInUser })
      ).unwrap();
    } catch (error) {
      setStatus(role);
      console.log(error);
    } finally {
      setStatus('idle');
    }
  };

  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

  return (
    <>
      <tr className='*:px-5 *:py-4'>
        <td>
          {firstname} {lastname}
        </td>
        <td>{email}</td>
        <td>{phoneNo}</td>
        <td>
          {id === loggedInUser.id ? (
            <span className='capitalize'>{role}</span>
          ) : (
            <select
              className={classNames('w-16', status === 'pending' ? 'cursor-wait' : '')}
              id='table'
              value={userRole}
              onChange={handleUpdateRole}
              disabled={status === 'pending'}
            >
              {roles.map(role => (
                <option key={role.label} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          )}
        </td>
        <td>
          <button
            className='text-indigo-500 font-medium focus-visible:outline-none'
            onClick={toggleDeleteModal}
          >
            Delete
          </button>
        </td>
      </tr>

      {openDeleteModal && (
        <DeleteUserModal
          closeModal={toggleDeleteModal}
          userId={id}
          pagination={pagination}
          loggedInUser={loggedInUser}
        />
      )}
    </>
  );
});

export default UserTableItem;
