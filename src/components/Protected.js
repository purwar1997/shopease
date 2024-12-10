import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectLoggedInUser } from '../app/slices/userSlice';

const Protected = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  const location = useLocation();

  if (!user) {
    return <Navigate to={`/login?redirectTo=${location.pathname}`} replace={true} />;
  }

  if (user.role !== 'user') {
    return <Navigate to='/admin/products' replace={true} />;
  }

  return children;
};

export default Protected;
