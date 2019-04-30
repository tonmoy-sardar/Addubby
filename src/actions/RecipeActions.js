import UserController from '../controllers/UserController';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv';



export const getListRecipes = (Token) => async (dispatch) => {
      const AuthStr = 'Bearer ' + Token;
      console.log("2---"+AuthStr);
      console.log("3---"+API_URL+'/Main/ListRecipes');
      return axios.get(API_URL+'/Main/ListRecipes', { 'headers': { 'Authorization': AuthStr } });
};

export const getRecipeDetails = (Token,id) => async (dispatch) => {
      const AuthStr = 'Bearer ' + Token;
      console.log("2---"+AuthStr);
      console.log("3---"+API_URL+'/Main/RecipeDetail/'+id);
      return axios.get(API_URL+'/Main/RecipeDetail/'+id, { 'headers': { 'Authorization': AuthStr } });
};

export const getListRestaurantRecipes = (Token) => async (dispatch) => {
      const AuthStr = 'Bearer ' + Token;
      console.log("2---"+AuthStr);
      console.log("3---"+API_URL+'/Main/ListRestaurantRecipes');
      return axios.get(API_URL+'/Main/ListRestaurantRecipes', { 'headers': { 'Authorization': AuthStr } });
};

export const getRestaurantRecipeDetails = (Token,id) => async (dispatch) => {
      const AuthStr = 'Bearer ' + Token;
      console.log("2---"+AuthStr);
      console.log("3---"+API_URL+'/Main/RestaurantRecipeDetail/'+id);
      return axios.get(API_URL+'/Main/RestaurantRecipeDetail/'+id, { 'headers': { 'Authorization': AuthStr } });
};