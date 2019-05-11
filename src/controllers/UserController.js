//import httpClient from './HttpClient';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

// var instance = axios.create({
//   baseURL: "http://turantam.com/",
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
// });
class UserController {
  constructor() {
    this.basePath = API_URL;
  }

  

  login = async (Username, Password) => {

    axios.post(this.basePath+'/login', {
      Username: Username,
      Password: Password
    })
    .then(function (response) {
      
      return response.data;
    })
    .catch(function (error) {
      
      return error.error;
    });
    
  }

  logout = () => null;
}

export default new UserController();
