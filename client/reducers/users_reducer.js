import {
  FETCH_USERS,
  FETCH_USER_DETAIL,
} from '../actions/types';

const INITIAL_STATE = {
  users: [],
  userDetail: {},
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, users: action.payload };
    case FETCH_USER_DETAIL:
      return { ...state, userDetail: action.payload };
    default:
      return state;
  }
}
