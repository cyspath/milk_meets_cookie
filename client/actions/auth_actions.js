import axios from 'axios';
import { browserHistory } from 'react-router';
import { jwtHeader } from './utils';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  CLEAR_AUTH_ERROR,
} from './types';

export function signinUser({ email, password }) {
  console.log('action: sign in');
  return function(dispatch) {
    axios
    .post('/api/signin', { email, password })
    .then(resp => {
      dispatch({ type: AUTH_USER }); // update state to indicate user-auth'ed
      localStorage.setItem('token', resp.data.token); // save JWT
      browserHistory.push('/'); // redirect to route /feature
    })
    .catch((err) => {
      dispatch(authError('Bad Login Info'))
    });
  }
}

export function signupUser({ username, dob, email, password, gender, lookingFor, province, city }) {
  console.log('action: sign up');
  return function(dispatch) {
    axios
    .post('/api/signup', { username, dob, email, password, gender, lookingFor, province, city })
    .then(resp => {
      dispatch({ type: AUTH_USER }); // update state to indicate user-auth'ed
      localStorage.setItem('token', resp.data.token); // save JWT
      browserHistory.push('/'); // redirect to route /feature
    })
    .catch(err => {
      dispatch(authError(err.response.data.error))
    });
  }
}


export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function clearAuthError() {
  return function(dispatch) {
    dispatch({ type: CLEAR_AUTH_ERROR });
  }
}

export function signoutUser() {
  console.log('action: sign out');
  localStorage.removeItem('token'); // remove JWT
  return { type: UNAUTH_USER };
}
