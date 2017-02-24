import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  CLEAR_AUTH_ERROR
} from './types';

export function getUser() {
  debugger
  return function(dispatch) {
    axios
    .get('/api/get_user')
    .then(resp => {
      console.log(resp.data);
      debugger
      // dispatch({ type: AUTH_USER, payload: resp.data }); // update state to indicate user-auth'ed
      // localStorage.setItem('token', resp.data.token); // save JWT
      // browserHistory.push('/'); // redirect to route /feature
    })
    .catch((err) => {
      debugger
      dispatch(authError(err.response.data.error))
    });
  }
}

export function signinUser({ email, password }) {
  return function(dispatch) {
    axios
    .post('/api/signin', { email, password })
    .then(resp => {
      dispatch({ type: AUTH_USER, payload: resp.data }); // update state to indicate user-auth'ed
      localStorage.setItem('token', resp.data.token); // save JWT
      browserHistory.push('/'); // redirect to route /feature
    })
    .catch((err) => {
      dispatch(authError('Bad Login Info'))
    });
  }
}

export function signupUser({ dob, email, password, sex, lookingFor, province, city }) {
  return function(dispatch) {
    axios
    .post('/api/signup', { dob, email, password, sex, lookingFor, province, city })
    .then(resp => {
      dispatch({ type: AUTH_USER, payload: resp.data }); // update state to indicate user-auth'ed
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
  localStorage.removeItem('token'); // remove JWT
  return { type: UNAUTH_USER };
}
