import UserController from '../controllers/UserController';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv';


export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
};

const loginRequest = () => ({
  type: actionTypes.LOGIN_REQUEST,
});

const loginError = error => ({
  type: actionTypes.LOGIN_ERROR,
  error,
});

const loginSuccess = user => ({
  type: actionTypes.LOGIN_SUCCESS,
  user,
});

const logoutRequest = () => ({
  type: actionTypes.LOGOUT,

});

export const login = (data) => async (dispatch) => {

  dispatch(loginRequest());

      axios.post(API_URL+'/Account/login', data)
      .then(function (response) {
        
        if(response.data.success==true)
        {
          const user =  response.data;
          dispatch(loginSuccess(user));
        }
        else{
          dispatch(loginError('Invalid Username/Password'));
        }
        
      })
      .catch(function (error) {

        dispatch(loginError(error.error));
      });
};

export const refresh = (Token) => async (dispatch) => {

  dispatch(loginRequest());

      axios.get(API_URL+'/Account/refresh', { 'headers': { 'Authorization': AuthStr } })
      .then(function (response) {
        
        if(response.data.success==true)
        {
          const user =  response.data;
          dispatch(loginSuccess(user));
        }
        else{
          dispatch(loginError('Something went wrong!'));
        }
        
      })
      .catch(function (error) {
        dispatch(loginError(error.error));
      });
};


export const getUserDetails = (Token) => async (dispatch) => {
      const AuthStr = 'Bearer ' + Token;
      return axios.get(API_URL+'/Account/user', { 'headers': { 'Authorization': AuthStr } });
};
export const getUserProfileDetails = (Token,userName) => async (dispatch) => {
  const AuthStr = 'Bearer ' + Token;
  return axios.get(API_URL+'/Account/user/'+userName, { 'headers': { 'Authorization': AuthStr } });
};


export const updateUserDetails = (Token,data) => async (dispatch) => {
  const AuthStr = 'Bearer ' + Token;
  return axios.post(API_URL+'/Account/updateUserProfile',data, { 'headers': { 'Authorization': AuthStr } });
};



export const signUp = (data) => async (dispatch) => {

  dispatch(loginRequest());

      axios.post(API_URL+'/Account/signup', data)
      .then(function (response) {
        
        if(response.data.success==true)
        {
          const user =  response.data;
          dispatch(loginSuccess(user));
        }
        else{
          dispatch(loginError('Something went wrong!'));
        }
        
      })
      .catch(function (error) {
        dispatch(loginError(error.error));
      });
};


export const logout = () => (dispatch) => {
  UserController.logout();
  dispatch(logoutRequest());
};
