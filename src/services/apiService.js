import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.countrystatecity.in/v1',
});

client.defaults.headers.common['X-CSCAPI-KEY'] = process.env.REACT_APP_API_KEY;

export async function fetchCountriesAPI() {
  const config = {
    method: 'get',
    url: '/countries',
  };

  const response = await client(config);
  return response.data;
}

export async function fetchStatesAPI(countryIso2Code) {
  const config = {
    method: 'get',
    url: `/countries/${countryIso2Code}/states`,
  };

  const response = await client(config);
  return response.data;
}

export async function fetchCitiesAPI(countryIso2Code, stateIso2Code) {
  const config = {
    method: 'get',
    url: `/countries/${countryIso2Code}/states/${stateIso2Code}/cities`,
  };

  const response = await client(config);
  return response.data;
}
