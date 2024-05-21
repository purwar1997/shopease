import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedInUser } from '../app/slices/userSlice';

const Home = () => {
  const user = useSelector(selectLoggedInUser);

  if (user?.role === 'admin') {
    return <Navigate to='/admin/products' replace={true} />;
  }

  return (
    <main className='page-height px-12 py-10'>
      <h1 className='text-3xl'>Home Page</h1>
    </main>
  );
};

export default Home;
