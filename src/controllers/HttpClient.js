import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

//let baseURL = "http://turantam.com/"
const client = axios.create({
  baseURL: "https://demo.addubby.com/api/v1/Account/",
  timeout: 100000,
  headers: { 'content-type': 'application/json' },
});


client.interceptors.request.use(config => config, (error) => {
  console.log('Failed to make request with error:');
  console.log(error);
  return Promise.reject(error);
});


client.interceptors.response.use(response => response, (error) => {
  console.log('API_URL--'+API_URL);
  console.log('Request got response with error:');
  console.log(error);
  return Promise.reject(error);
});

export default client;
