import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <>
      <Navbar />

      <main className='px-12 py-10'>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
