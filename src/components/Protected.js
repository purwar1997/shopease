import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedInUser } from '../app/slices/userSlice';

const Protected = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  const path = window.location.pathname;

  if (!user) {
    return <Navigate to={`/login?redirectTo=${path}`} replace={true} />;
  }

  return children;
};

export default Protected;
