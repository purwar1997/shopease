import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHandleModal } from '../hooks';
import { RxCross2 } from 'react-icons/rx';
import { addressInputs } from '../utils/formInputs';
import { fetchCountriesAPI, fetchStatesAPI, fetchCitiesAPI } from '../services';
import { addNewAddressAsync } from '../app/slices/addressSlice';
import { selectLoggedInUser } from '../app/slices/userSlice';
import { classNames, handleClickOutside } from '../services';
import InputControl from './InputControl';
import SelectControl from './SelectControl';
import ButtonLoader from './ButtonLoader';

const AddAddressModal = ({ closeModal, setSelectedAddress }) => {
  const [address, setAddress] = useState({
    fullname: '',
    phoneNo: '',
    line1: '',
    line2: '',
    landmark: '',
    country: '',
    state: '',
    city: '',
    postalCode: '',
    default: false,
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [status, setStatus] = useState('idle');

  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useHandleModal(closeModal);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countryList = await fetchCountriesAPI();
        setCountries(countryList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    setStates([]);
    setAddress(prevAddress => ({ ...prevAddress, state: '' }));

    const fetchStates = async () => {
      try {
        const countryIso2Code = countries.find(country => country.name === address.country).iso2;
        const stateList = await fetchStatesAPI(countryIso2Code);
        setStates(stateList);
      } catch (error) {
        console.log(error);
      }
    };

    if (address.country) {
      fetchStates();
    }
  }, [address.country]);

  useEffect(() => {
    setCities([]);
    setAddress(prevAddress => ({ ...prevAddress, city: '' }));

    const fetchCities = async () => {
      try {
        const countryIso2Code = countries.find(country => country.name === address.country).iso2;
        const stateIso2Code = states.find(state => state.name === address.state).iso2;
        const cityList = await fetchCitiesAPI(countryIso2Code, stateIso2Code);
        setCities(cityList);
      } catch (error) {
        console.log(error);
      }
    };

    if (address.country && address.state) {
      fetchCities();
    }
  }, [address.state]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setAddress({ ...address, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setStatus('pending');
      const data = await dispatch(addNewAddressAsync({ address, userId: user.id })).unwrap();
      setSelectedAddress(data.address);
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setStatus('idle');
    }
  };

  const selectOptionList = name => {
    const optionList = [];

    switch (name) {
      case 'country': {
        return optionList.concat(countries);
      }
      case 'state': {
        return optionList.concat(states);
      }
      case 'city': {
        return optionList.concat(cities);
      }
      default: {
        return optionList;
      }
    }
  };

  return (
    <div
      className='w-screen h-screen fixed top-0 left-0 bg-black/40 flex justify-center items-center z-30'
      onClick={e => handleClickOutside(e, closeModal)}
    >
      <section className='max-w-screen-sm w-full max-h-[90vh] bg-white rounded-lg flex flex-col'>
        <header className='bg-gray-100 px-6 py-4 rounded-t-lg border-b border-gray-300 flex justify-between items-center'>
          <h2 className='text-lg'>Enter a new delivery address</h2>

          <button className='text-2xl' onClick={closeModal}>
            <RxCross2 />
          </button>
        </header>

        <form className='flex-1 overflow-y-auto' onSubmit={handleSubmit}>
          <div className='px-6 py-5 space-y-4'>
            <InputControl
              {...addressInputs[0]}
              value={address[addressInputs[0].name]}
              onChange={handleChange}
            />

            <InputControl
              {...addressInputs[1]}
              value={address[addressInputs[1].name]}
              onChange={handleChange}
            />

            <InputControl
              {...addressInputs[2]}
              value={address[addressInputs[2].name]}
              onChange={handleChange}
            />

            <InputControl
              {...addressInputs[3]}
              value={address[addressInputs[3].name]}
              onChange={handleChange}
            />

            <InputControl
              {...addressInputs[4]}
              value={address[addressInputs[4].name]}
              onChange={handleChange}
            />

            <div className='flex gap-5'>
              <SelectControl
                {...addressInputs[5]}
                value={address[addressInputs[5].name]}
                onChange={handleChange}
                options={selectOptionList(addressInputs[5].name)}
              />

              <SelectControl
                {...addressInputs[6]}
                value={address[addressInputs[6].name]}
                onChange={handleChange}
                options={selectOptionList(addressInputs[6].name)}
              />
            </div>

            <div className='flex gap-5'>
              <SelectControl
                {...addressInputs[7]}
                value={address[addressInputs[7].name]}
                onChange={handleChange}
                options={selectOptionList(addressInputs[7].name)}
              />

              <InputControl
                {...addressInputs[8]}
                value={address[addressInputs[8].name]}
                onChange={handleChange}
              />
            </div>

            <div className='flex gap-2'>
              <input
                type='checkbox'
                name='default'
                id='default'
                checked={address.default}
                onChange={handleChange}
              />
              <label htmlFor='default'>Make this my default address</label>
            </div>
          </div>

          <div className='px-6 pt-1 pb-6'>
            <button
              className={classNames(
                'w-full h-12 bg-indigo-600 rounded-md text-white font-medium hover:bg-indigo-700 flex justify-center items-center',
                status === 'pending' ? 'cursor-wait' : ''
              )}
              type='submit'
              disabled={status === 'pending'}
            >
              {status === 'pending' ? <ButtonLoader /> : 'Use this address'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddAddressModal;
