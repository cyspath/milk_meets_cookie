import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  CLEAR_AUTH_ERROR,
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true, currentUser: {} };
    case UNAUTH_USER:
      return { ...state, authenticated: false, currentUser: undefined };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_AUTH_ERROR:
      return { ...state, error: undefined };
    default:
      return state;
  }
}
