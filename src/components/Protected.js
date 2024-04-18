import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedInUser } from '../app/slices/authSlice';

const Protected = ({ children }) => {
  const user = useSelector(selectLoggedInUser);

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default Protected;
