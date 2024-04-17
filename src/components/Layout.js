import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <Fragment>
      <Navbar />

      <main className='px-12 py-10'>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default Layout;
