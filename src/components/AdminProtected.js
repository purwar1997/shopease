import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedInUser } from '../app/slices/userSlice';

const AdminProtected = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  const path = window.location.pathname;

  if (!user) {
    return <Navigate to={`/login?redirectTo=${path}`} replace={true} />;
  }

  if (user.role !== 'admin') {
    return <Navigate to='/' replace={true} />;
  }

  return children;
};

export default AdminProtected;
