import axios from 'axios';
import { jwtHeader } from './utils';
import {
  FETCH_USER_DETAIL,
} from './types';

export function fetchUserDetail(id) {
  console.log('action: fetchUserDetail:', id);
  return function(dispatch) {
    axios
    .get('/api/user/' + id, jwtHeader())
    .then(resp => {
      dispatch({ type: FETCH_USER_DETAIL, payload: resp.data.userDetail });
    })
    .catch((err) => {
      console.log(err.response.data.error);
    });
  }
}
