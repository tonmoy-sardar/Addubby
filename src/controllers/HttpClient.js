import axios from 'axios';
import { API_URL } from 'react-native-dotenv';


const client = axios.create({
  baseURL: "https://demo.addubby.com/api/v1/Account/",
  timeout: 100000,
  headers: { 'content-type': 'application/json' },
});


client.interceptors.request.use(config => config, (error) => {
  
  return Promise.reject(error);
});


client.interceptors.response.use(response => response, (error) => {
 
  return Promise.reject(error);
});

export default client;
