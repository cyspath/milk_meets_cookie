import axios from 'axios';
import {
  FETCH_MESSAGE
} from './types';

export function fetchMessage() {
  return function(dispatch) {
    axios.get('/message', {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then((resp) => {
      dispatch({
        type: FETCH_MESSAGE,
        payload: resp.data.message
      });
    });
  }
}
