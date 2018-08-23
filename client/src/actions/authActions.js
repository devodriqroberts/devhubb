import axios from 'axios';
import jtw_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

import { GET_ERRORS, SET_CURRENT_USER } from './types';


// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
  .post('/api/users/register', userData)
  .then(res => history.push('/login'))
  .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

 // Login - Get user token
export const loginUser = (userData) => dispatch => {
  axios
  .post('/api/users/login', userData)
  .then(res => {
    // Save to local storage
    const { token } = res.data;
    // Set token to local storage 
    localStorage.setItem('jwtToken', token);
    // Set token to auth header
    setAuthToken(token);
    // Decode token to get user data
    const decoded = jtw_decode(token);
    // Set current user 
    dispatch(setCurrentUser(decoded));
  })
  .catch(err => dispatch({
    type: GET_ERRORS,
      payload: err.response.data
  }));
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};