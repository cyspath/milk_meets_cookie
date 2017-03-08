import axios from 'axios';
import { jwtHeader } from './utils';
import {
  FETCH_USERS
} from './types';

export function fetchUsers(params) {
  console.log('action: fetchUsers');
  return function(dispatch) {
    axios
    .get('/api/home/fetch_users', jwtHeader(params))
    .then(resp => {
      console.log(resp.data);
      dispatch({ type: FETCH_USERS, payload: resp.data });
    })
    .catch((err) => {
      dispatch(authError(err.response.data.error))
    });
  }
}
