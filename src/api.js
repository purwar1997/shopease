import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.countrystatecity.in/v1',
});

const apiKey = process.env.REACT_APP_API_KEY;

export const getCountries = async () => {
  const config = {
    method: 'get',
    url: '/countries',
    headers: {
      'X-CSCAPI-KEY': apiKey,
    },
  };

  const response = await client(config);
  return response.data;
};

export const getStates = async countryIso2Code => {
  const config = {
    method: 'get',
    url: `/countries/${countryIso2Code}/states`,
    headers: {
      'X-CSCAPI-KEY': apiKey,
    },
  };

  const response = await client(config);
  return response.data;
};

export const getCities = async (countryIso2Code, stateIso2Code) => {
  const config = {
    method: 'get',
    url: `/countries/${countryIso2Code}/states/${stateIso2Code}/cities`,
    headers: {
      'X-CSCAPI-KEY': apiKey,
    },
  };

  const response = await client(config);
  return response.data;
};
