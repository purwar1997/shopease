import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import { fetchAddressesAsync, selectAddresses } from '../app/slices/addressSlice';
import { selectLoggedInUser } from '../app/slices/userSlice';
import AddressCard from '../components/AddressCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Addresses = () => {
  const status = useSelector(state => state.address.status);
  const error = useSelector(state => state.address.error);
  const addresses = useSelector(selectAddresses);
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchAddressesAsync(user.id));
    }
  }, [dispatch, user]);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (error) {
    throw error;
  }

  const addressList = addresses.length
    ? [addresses.find(address => address.default), ...addresses.filter(address => !address.default)]
    : [];

  return (
    <main className='page-height px-12 py-10'>
      <h1 className='text-3xl text-center'>Your addresses</h1>

      <section className='mt-10 flex justify-center'>
        <ul className='grid grid-cols-3 gap-5'>
          <li>
            <Link to='add'>
              <div className='w-80 h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-3'>
                <span className='text-4xl text-gray-400'>
                  <FaPlus />
                </span>

                <h2 className='text-xl'>Add address</h2>
              </div>
            </Link>
          </li>

          {addressList.map(address => (
            <AddressCard key={address.id} address={address} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Addresses;
