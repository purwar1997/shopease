import { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserRoleAsync } from '../app/slices/userSlice';
import { selectLoggedInUser } from '../app/slices/userSlice';
import { classNames } from '../services';
import UpdateRoleModal from './UpdateRoleModal';
import DeleteUserModal from './DeleteUserModal';
import DeleteAdminModal from './DeleteAdminModal';

const roles = [
  { label: 'User', value: 'user' },
  { label: 'Admin', value: 'admin' },
];

const UserTableItem = memo(({ user, pagination }) => {
  const { id, firstname, lastname, email, phoneNo, role } = user;

  const [userRole, setUserRole] = useState(role);
  const [status, setStatus] = useState('idle');
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openAdminModal, setOpenAdminModal] = useState(false);

  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  const toggleUpdateModal = () => setOpenUpdateModal(!openUpdateModal);
  const toggleUserModal = () => setOpenUserModal(!openUserModal);
  const toggleAdminModal = () => setOpenAdminModal(!openAdminModal);

  const handleUpdateRole = async e => {
    const newRole = e.target.value;

    if (id === loggedInUser.id && newRole === 'user') {
      toggleUpdateModal();
      return;
    }

    try {
      setUserRole(newRole);
      setStatus('pending');
      await dispatch(updateUserRoleAsync({ id, role: newRole, user: loggedInUser })).unwrap();
    } catch (error) {
      setUserRole(role);
      console.log(error);
    } finally {
      setStatus('idle');
    }
  };

  const handleClick = () => (id === loggedInUser.id ? toggleAdminModal() : toggleUserModal());

  return (
    <tr className='*:px-5 *:py-4 hover:bg-slate-100'>
      <td>
        {firstname} {lastname} {id === loggedInUser.id ? '(Self)' : ''}
      </td>
      <td>{email}</td>
      <td>{phoneNo}</td>
      <td>
        <select
          className={classNames('w-16 bg-transparent', status === 'pending' ? 'cursor-wait' : '')}
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

        {openUpdateModal && <UpdateRoleModal closeModal={toggleUpdateModal} user={user} />}
      </td>
      <td>
        <button
          className='text-indigo-500 font-medium focus-visible:outline-none'
          onClick={handleClick}
        >
          Delete
        </button>

        {openAdminModal && <DeleteAdminModal closeModal={toggleAdminModal} user={user} />}

        {openUserModal && (
          <DeleteUserModal
            closeModal={toggleUserModal}
            user={user}
            pagination={pagination}
            loggedInUser={loggedInUser}
          />
        )}
      </td>
    </tr>
  );
});

export default UserTableItem;
