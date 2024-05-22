import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { FaCartShopping, FaCircleUser, FaRegHeart } from 'react-icons/fa6';
import { useHandleDropdown } from '../hooks';
import { fetchCartAsync, selectCartCount } from '../app/slices/cartSlice';
import { selectLoggedInUser } from '../app/slices/userSlice';
import { classNames } from '../services';

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const cartCount = useSelector(selectCartCount);
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useHandleDropdown(dropdownRef, setOpenDropdown);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartAsync(user.id));
    }
  }, [dispatch, user]);

  const toggleDropdown = () => setOpenDropdown(!openDropdown);

  const navigationItems = [
    { name: 'Home', href: '/', show: !user || user.role === 'user' },
    { name: 'Products', href: '/products', show: !user || user.role === 'user' },
    { name: 'Checkout', href: '/checkout', show: false },
    { name: 'Products', href: '/admin/products', show: user?.role === 'admin' },
    { name: 'Orders', href: '/admin/orders', show: user?.role === 'admin' },
    { name: 'Users', href: '/admin/users', show: user?.role === 'admin' },
  ];

  const dropdownItems = [
    { name: 'Order History', href: '/orders', show: !user || user.role === 'user' },
    { name: 'Wishlist', href: '/wishlist', show: !user || user.role === 'user' },
    { name: 'Saved Addresses', href: '/addresses', show: !user || user.role === 'user' },
    { name: 'Edit Profile', href: '/profile', show: !user || user.role === 'user' },
    { name: 'Manage Products', href: '/admin/products', show: user?.role === 'admin' },
    { name: 'Manage Orders', href: '/admin/orders', show: user?.role === 'admin' },
    { name: 'Manage Users', href: '/admin/users', show: user?.role === 'admin' },
    { name: 'Sign In', href: '/login', show: !user },
    { name: 'Sign Out', href: '/logout', show: user },
  ];

  return (
    <header className='bg-gray-700 h-20 px-12 flex justify-between items-center gap-12 sticky top-0 z-10'>
      <Link to={user?.role === 'admin' ? 'admin/products' : '.'}>
        <img
          className='h-12'
          src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
          alt='company-logo'
        />
      </Link>

      <nav className='flex-1 space-x-5'>
        {navigationItems.map(
          item =>
            item.show && (
              <NavLink
                className={({ isActive }) =>
                  classNames('px-3 py-2 rounded-md text-white', isActive ? 'active' : '')
                }
                key={item.name}
                to={item.href}
              >
                {item.name}
              </NavLink>
            )
        )}
      </nav>

      <div className='flex gap-8'>
        {user && user.role === 'user' && (
          <Link className='relative' to='cart'>
            <span className='text-white text-2xl'>
              <FaCartShopping />
            </span>

            {cartCount > 0 && (
              <span className='absolute -top-2 -right-1.5 bg-indigo-500 px-[5px] py-px text-white text-xs rounded'>
                {cartCount}
              </span>
            )}
          </Link>
        )}

        {user && user.role === 'user' && (
          <Link to='wishlist'>
            <span className='text-white text-2xl'>
              <FaRegHeart />
            </span>
          </Link>
        )}

        <div className='relative' ref={dropdownRef}>
          <button className='text-white text-2xl' onClick={toggleDropdown}>
            <FaCircleUser />
          </button>

          {openDropdown && (
            <ul className='absolute w-48 right-0 top-10 z-20 bg-white ring-1 ring-black/10 shadow-lg rounded-md py-1'>
              {dropdownItems.map(
                item =>
                  item.show && (
                    <li key={item.name}>
                      <Link
                        className='block px-5 py-2 text-sm hover:bg-gray-100'
                        to={item.href}
                        onClick={toggleDropdown}
                      >
                        {item.name}
                      </Link>
                    </li>
                  )
              )}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
