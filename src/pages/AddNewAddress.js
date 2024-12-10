import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addressInputs } from '../utils/formInputs';
import { fetchCountriesAPI, fetchStatesAPI, fetchCitiesAPI } from '../services';
import { addNewAddressAsync } from '../app/slices/addressSlice';
import { selectLoggedInUser } from '../app/slices/userSlice';
import { classNames } from '../services';
import InputControl from '../components/InputControl';
import SelectControl from '../components/SelectControl';
import ButtonLoader from '../components/ButtonLoader';

const AddNewAddress = () => {
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
  const navigate = useNavigate();

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
      await dispatch(addNewAddressAsync({ address, userId: user.id })).unwrap();
      navigate('..', { relative: 'path' });
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
    <main className='page-height px-12 py-10 flex flex-col items-center gap-10'>
      <h1 className='text-3xl'>Add new address</h1>

      <form className='max-w-2xl w-full space-y-5' onSubmit={handleSubmit}>
        {addressInputs.map(input =>
          input.type ? (
            <InputControl
              key={input.id}
              {...input}
              value={address[input.name]}
              onChange={handleChange}
            />
          ) : (
            <SelectControl
              key={input.id}
              {...input}
              value={address[input.name]}
              onChange={handleChange}
              options={selectOptionList(input.name)}
            />
          )
        )}

        <div className='flex items-center gap-2.5'>
          <input
            type='checkbox'
            id='default'
            name='default'
            value={address.default}
            onChange={handleChange}
          />
          <label htmlFor='default'>Make this my default address</label>
        </div>

        <button
          className={classNames(
            'w-full h-12 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 flex justify-center items-center',
            status === 'pending' ? 'cursor-wait' : ''
          )}
          type='submit'
          disabled={status === 'pending'}
        >
          {status === 'pending' ? <ButtonLoader /> : 'Add address'}
        </button>
      </form>
    </main>
  );
};

export default AddNewAddress;
