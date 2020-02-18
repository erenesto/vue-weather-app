/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const weatherApiOptions = {
  baseURL: 'http://api.openweathermap.org/data/2.5',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const weatherApiInstance = axios.create(weatherApiOptions);

weatherApiInstance.interceptors.request.use((config) => {
  // eslint-disable-next-line no-param-reassign
  config.params.appid = process.env.VUE_APP_OPENWEATHER_API_KEY;
  return config;
});

const geoApiOptions = {
  baseURL: 'http://api.ipstack.com',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const geoApiInstance = axios.create(geoApiOptions);

geoApiInstance.interceptors.request.use((config) => {
  // eslint-disable-next-line no-param-reassign
  config.params.access_key = process.env.VUE_APP_IPSTACK_API_KEY;
  return config;
});
