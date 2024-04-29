import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addressInputs } from '../utils/formInputs';
import { fetchCountriesAPI, fetchStatesAPI, fetchCitiesAPI } from '../api';
import { fetchAddressByIdAsync, updateAddressAsync } from '../app/slices/addressSlice';
import { classNames } from '../utils/helpers';
import InputControl from '../components/InputControl';
import SelectControl from '../components/SelectControl';
import ButtonLoader from '../components/ButtonLoader';
import LoadingSpinner from '../components/LoadingSpinner';

const UpdateAddress = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [address, setAddress] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [updateStatus, setUpdateStatus] = useState('idle');
  const componentMountedRef = useRef(false);

  const status = useSelector(state => state.address.selectedAddressStatus);
  const selectedAddress = useSelector(state => state.address.selectedAddress);
  const error = useSelector(state => state.address.selectedAddressError);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const address = await dispatch(fetchAddressByIdAsync(id)).unwrap();
        setAddress(address);

        const countryList = await fetchCountriesAPI();
        setCountries(countryList);

        const countryIso2Code = countryList.find(country => country.name === address.country).iso2;
        const stateList = await fetchStatesAPI(countryIso2Code);
        setStates(stateList);

        const stateIso2Code = stateList.find(state => state.name === address.state).iso2;
        const cityList = await fetchCitiesAPI(countryIso2Code, stateIso2Code);
        setCities(cityList);

        componentMountedRef.current = true;
      } catch (error) {
        console.log(error);
      }
    };

    fetchAddress();
  }, [dispatch, id]);

  useEffect(() => {
    if (componentMountedRef.current) {
      setStates([]);
      setAddress({ ...address, state: '' });

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
    }
  }, [address.country]);

  useEffect(() => {
    if (componentMountedRef.current) {
      setCities([]);
      setAddress({ ...address, city: '' });

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
    }
  }, [address.state]);

  if (status === 'idle' || status === 'loading') {
    return <LoadingSpinner />;
  }

  if (error) {
    throw error;
  }

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setAddress({ ...address, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setUpdateStatus('pending');
      console.log(id, address);
      await dispatch(updateAddressAsync({ id, updates: address })).unwrap();
      navigate('/addresses', { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      setUpdateStatus('idle');
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
      <h1 className='text-3xl'>Edit your address</h1>

      <form className='max-w-2xl w-full space-y-5' onSubmit={handleSubmit}>
        {addressInputs.map(input =>
          input.type ? (
            <InputControl
              key={input.id}
              {...input}
              value={address[input.name] ?? ''}
              onChange={handleChange}
            />
          ) : (
            <SelectControl
              key={input.id}
              {...input}
              value={address[input.name] ?? ''}
              onChange={handleChange}
              options={selectOptionList(input.name)}
            />
          )
        )}

        {!selectedAddress.default && (
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
        )}

        <button
          className={classNames(
            'w-full h-12 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 flex justify-center items-center',
            updateStatus === 'pending' ? 'cursor-wait' : ''
          )}
          type='submit'
          disabled={updateStatus === 'pending'}
        >
          {updateStatus === 'pending' ? <ButtonLoader /> : 'Update address'}
        </button>
      </form>
    </main>
  );
};

export default UpdateAddress;
