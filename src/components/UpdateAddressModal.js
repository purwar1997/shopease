import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHandleModal } from '../utils/customHooks';
import { RxCross2 } from 'react-icons/rx';
import { addressInputs } from '../utils/formInputs';
import { fetchCountriesAPI, fetchStatesAPI, fetchCitiesAPI } from '../api';
import { updateAddressAsync } from '../app/slices/addressSlice';
import { classNames, handleClickOutside } from '../utils/helpers';
import InputControl from './InputControl';
import SelectControl from './SelectControl';
import ButtonLoader from './ButtonLoader';

const UpdateAddressModal = ({ closeModal, deliveryAddress, setSelectedAddress }) => {
  const [address, setAddress] = useState(deliveryAddress);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [status, setStatus] = useState('idle');
  const componentMountedRef = useRef(false);

  const dispatch = useDispatch();

  useHandleModal(closeModal);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
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

    fetchLocation();
  }, []);

  useEffect(() => {
    if (componentMountedRef.current) {
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
    }
  }, [address.country]);

  useEffect(() => {
    if (componentMountedRef.current) {
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

      const data = await dispatch(
        updateAddressAsync({ id: deliveryAddress.id, updates: address })
      ).unwrap();

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
      className='w-screen h-screen fixed top-0 left-0 bg-black/40 flex justify-center items-center z-30 cursor-default'
      onClick={e => handleClickOutside(e, closeModal)}
    >
      <section className='w-[640px] bg-white rounded-lg'>
        <header className='bg-gray-100 px-6 py-4 rounded-t-lg border-b border-gray-300 flex justify-between items-center'>
          <h2 className='text-lg'>Update your shipping address</h2>

          <button className='text-2xl' onClick={closeModal}>
            <RxCross2 />
          </button>
        </header>

        <form className='max-h-[80vh] overflow-y-auto' onSubmit={handleSubmit}>
          <div className='px-6 py-5 space-y-4'>
            {addressInputs.slice(0, 5).map(input => (
              <InputControl
                key={input.id}
                {...input}
                value={address[input.name]}
                onChange={handleChange}
              />
            ))}

            <div className='flex gap-5'>
              {addressInputs.slice(5, 7).map(input => (
                <SelectControl
                  key={input.id}
                  {...input}
                  value={address[input.name]}
                  onChange={handleChange}
                  options={selectOptionList(input.name)}
                />
              ))}
            </div>

            <div className='flex gap-5'>
              {addressInputs
                .slice(7)
                .map(input =>
                  input.name === 'city' ? (
                    <SelectControl
                      key={input.id}
                      {...input}
                      value={address[input.name]}
                      onChange={handleChange}
                      options={selectOptionList(input.name)}
                    />
                  ) : (
                    <InputControl
                      key={input.id}
                      {...input}
                      value={address[input.name]}
                      onChange={handleChange}
                    />
                  )
                )}
            </div>

            {!deliveryAddress.default && (
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
            )}
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

export default UpdateAddressModal;
