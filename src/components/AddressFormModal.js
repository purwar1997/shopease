import { useState, useEffect, useRef } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { addressInputs } from '../utils/formInputs';
import { getCountries, getStates, getCities } from '../api';
import InputControl from './InputControl';
import SelectControl from './SelectControl';

const AddressFormModal = ({ toggleAddressModal, deliveryAddress }) => {
  const [address, setAddress] = useState(
    deliveryAddress ?? {
      fullname: '',
      phoneNo: '',
      line1: '',
      line2: '',
      landmark: '',
      country: '',
      state: '',
      city: '',
      postalCode: '',
      isDefault: false,
    }
  );

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const componentMountedRef = useRef(false);

useEffect(() => {
  document.body.classList.add('overflow-hidden');

  return () => document.body.classList.remove('overflow-hidden');
}, []);

useEffect(() => {
  const fetchInitialData = async () => {
    try {
      const countryList = await getCountries();
      setCountries(countryList);

      if (deliveryAddress) {
        const countryIso2Code = countryList.find(country => country.name === address.country).iso2;

        const stateList = await getStates(countryIso2Code);
        setStates(stateList);

        const stateIso2Code = stateList.find(state => state.name === address.state).iso2;
        const cityList = await getCities(countryIso2Code, stateIso2Code);
        setCities(cityList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchInitialData();
}, []);

  useEffect(() => {
    if (componentMountedRef.current) {
      setStates([]);
      setAddress(prevAddress => ({ ...prevAddress, state: '' }));

      const fetchStateList = async () => {
        const countryIso2Code = countries.find(country => country.name === address.country).iso2;

        try {
          const stateList = await getStates(countryIso2Code);
          setStates(stateList);
        } catch (error) {
          console.log(error);
        }
      };

      if (address.country) {
        fetchStateList();
      }
    }
  }, [address.country]);

  useEffect(() => {
    if (componentMountedRef.current) {
      setCities([]);
      setAddress(prevAddress => ({ ...prevAddress, city: '' }));

      const fetchCityList = async () => {
        const countryIso2Code = countries.find(country => country.name === address.country).iso2;
        const stateIso2Code = states.find(state => state.name === address.state).iso2;

        try {
          const cityList = await getCities(countryIso2Code, stateIso2Code);
          setCities(cityList);
        } catch (error) {
          console.log(error);
        }
      };

      if (address.country && address.state) {
        fetchCityList();
      }
    }
  }, [address.state]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setAddress({ ...address, [name]: type === 'checkbox' ? checked : value });

    if (e.target instanceof HTMLSelectElement) {
      componentMountedRef.current = true;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    toggleAddressModal();
  };

  const handleClickOutside = e => {
    if (e.target === e.currentTarget) {
      toggleAddressModal();
    }
  };

  const selectOptionList = label => {
    const optionList = [];

    switch (label) {
      case 'Country': {
        return optionList.concat(countries);
      }
      case 'State': {
        return optionList.concat(states);
      }
      case 'City': {
        return optionList.concat(cities);
      }
      default: {
        return optionList;
      }
    }
  };

  return (
    <section
      className='fixed top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center'
      onClick={handleClickOutside}
    >
      <div className='w-[640px] bg-white rounded-lg'>
        <div className='bg-gray-100 px-6 py-4 rounded-t-lg border-b border-gray-300 flex justify-between items-center'>
          <h2 className='text-lg'>
            {deliveryAddress ? 'Update your shipping address' : 'Enter a new delivery address'}
          </h2>

          <button className='text-2xl' onClick={toggleAddressModal}>
            <RxCross2 />
          </button>
        </div>

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
                  options={selectOptionList(input.label)}
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
                      options={selectOptionList(input.label)}
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

            <div className='flex gap-2'>
              <input
                type='checkbox'
                name='isDefault'
                id='default'
                checked={address.isDefault}
                onChange={handleChange}
              />
              <label htmlFor='default'>Make this my default address</label>
            </div>
          </div>

          <div className='px-6 pt-2 pb-6'>
            <button
              className='block w-full bg-indigo-600 py-2.5 rounded-md text-white font-medium hover:bg-indigo-700'
              type='submit'
            >
              Use this address
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddressFormModal;
