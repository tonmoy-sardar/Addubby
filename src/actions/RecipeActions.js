import UserController from '../controllers/UserController';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv';



export const getListRecipes = (Token) => async (dispatch) => {
      const AuthStr = 'Bearer ' + Token;

      return axios.get(API_URL+'/Main/ListRecipes', { 'headers': { 'Authorization': AuthStr } });
};

export const getRecipeDetails = (Token,id) => async (dispatch) => {
      const AuthStr = 'Bearer ' + Token;

      return axios.get(API_URL+'/Main/RecipeDetail/'+id, { 'headers': { 'Authorization': AuthStr } });
};

export const getListRestaurantRecipes = (Token) => async (dispatch) => {
      const AuthStr = 'Bearer ' + Token;

      return axios.get(API_URL+'/Main/ListRestaurantRecipes', { 'headers': { 'Authorization': AuthStr } });
};

export const getRestaurantRecipeDetails = (Token,id) => async (dispatch) => {
      const AuthStr = 'Bearer ' + Token;

      return axios.get(API_URL+'/Main/RestaurantRecipeDetail/'+id, { 'headers': { 'Authorization': AuthStr } });
};

export const searchRecipe = (Token,name) => async (dispatch) => {
      const AuthStr = 'Bearer ' + Token;

      return axios.get(API_URL+'/Main/SearchRecipe/'+name, { 'headers': { 'Authorization': AuthStr } });
};

export const addRestaurant = (Token,data) => async (dispatch) => {
      const AuthStr = 'Bearer ' + Token;

      return axios.post(API_URL+'/Main/CreateRestaurant/',data, { 'headers': { 'Authorization': AuthStr } } );
};

export const addRecipe = (Token,data) => async (dispatch) => {
      const AuthStr = 'Bearer ' + Token;

      return axios.post(API_URL+'/Main/CreateRecipe/',data, { 'headers': { 'Authorization': AuthStr } } );
};

// bookmark

export const getUserBookmarkRecipeList = (Token,userName) => async (dispatch) => {
      const AuthStr = 'Bearer ' + Token;
      return axios.get(API_URL+'/Main/BookmarkRecipeList/'+userName, { 'headers': { 'Authorization': AuthStr } });
};

export const bookmarkRecipe = (Token,data) => async (dispatch) => {
      const AuthStr = 'Bearer ' + Token;

      return axios.post(API_URL+'/Main/BookmarkRecipe/',data, { 'headers': { 'Authorization': AuthStr } } );
};

export const unbookmarkRecipe = (Token,data) => async (dispatch) => {
      const AuthStr = 'Bearer ' + Token;
      return axios.post(API_URL+'/Main/UnbookmarkRecipe/',data, { 'headers': { 'Authorization': AuthStr } } );
};

export const searchInBookmarks = (Token,data) => async (dispatch) => {
      const AuthStr = 'Bearer ' + Token;
      return axios.post(API_URL+'/Main/SearchInBookmarks/', data,{ 'headers': { 'Authorization': AuthStr } } );
};




// favorites

export const getUserFavoriteRecipeList = (Token,userName) => async (dispatch) => {
      const AuthStr = 'Bearer ' + Token;
      return axios.get(API_URL+'/Main/FavoritesRecipeList/'+userName, { 'headers': { 'Authorization': AuthStr } });
};

export const favoriteRecipe = (Token,data) => async (dispatch) => {
      const AuthStr = 'Bearer ' + Token;

      return axios.post(API_URL+'/Main/FavoriteRecipe/',data, { 'headers': { 'Authorization': AuthStr } } );
};

export const unfavoriteRecipe = (Token,data) => async (dispatch) => {
      const AuthStr = 'Bearer ' + Token;
      return axios.post(API_URL+'/Main/UnfavoriteRecipe/',data, { 'headers': { 'Authorization': AuthStr } } );
};