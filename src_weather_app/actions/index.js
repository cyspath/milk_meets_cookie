import axios from 'axios';

const API_KEY = 'ff70b9d256187979ff8038b62a6a6412';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
  const url = `${ROOT_URL}&q=${city},us`;
  const request = axios.get(url);

  // console.log('Request: ', request);
  
  return {
    type: FETCH_WEATHER,
    payload: request
  };
}
