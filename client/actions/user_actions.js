import axios from 'axios';
import { jwtHeader } from './utils';
import {
  CURRENT_USER,
  FETCH_USER_DETAIL,
  TOGGLE_LIKE_USER,
} from './types';

export function getCurrentUser() {
  console.log('action: getCurrentUser');
  return function(dispatch) {
    axios
    .get('/api/current_user', jwtHeader())
    .then(resp => {
      console.log(resp.data);
      dispatch({ type: CURRENT_USER, payload: resp.data });
    })
    .catch((err) => {
      dispatch(authError(err.response.data.error))
    });
  }
}

export function fetchUserDetail(id) {
  console.log('action: fetchUserDetail:', id);
  return function(dispatch) {
    axios
    .get('/api/user/' + id, jwtHeader())
    .then(resp => {
      dispatch({ type: FETCH_USER_DETAIL, payload: resp.data.user });
    })
    .catch((err) => {
      console.log(err.response.data.error);
    });
  }
}

export function toggleLikeUser(params) {
  console.log('action: likeUser', params);
  return function(dispatch) {
    axios
    .post('/api/user/toggle_like_user', params, jwtHeader())
    .then(resp => {
      dispatch({ type: TOGGLE_LIKE_USER, payload: resp.data });
    })
    .catch((err) => {
      console.log(err.response.data.error);
    });
  }
}
