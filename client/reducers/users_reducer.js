import {
  CURRENT_USER,
  FETCH_USERS,
  FETCH_USER_DETAIL,
  TOGGLE_LIKE_USER,
  ONLINE_USERS,
} from '../actions/types';

const INITIAL_STATE = {
  currentUser: {},
  likedUserIds: new Set([]),
  searchPreference: {},
  users: [],
  userDetail: {},
  onlineUsers: {},
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {

    case CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        likedUserIds: new Set(action.payload.likedUserIds)
      };

    case FETCH_USERS:
      return {
        ...state,
        users: action.payload.users,
        searchPreference: action.payload.searchPreference
      };

    case FETCH_USER_DETAIL:
      action.payload.user.searchPreference = action.payload.searchPreference;
      return {
        ...state,
        userDetail: action.payload.user
      };

    case TOGGLE_LIKE_USER:
      return {
        ...state,
        likedUserIds: updateLikedUserIds(state.likedUserIds, action.payload.like)
      };

    case ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.payload
      };

    default:
      return state;
  }
}

const updateLikedUserIds = (likedUserIds, like) => {
  if (like.active) {
    likedUserIds.add(like.liked_user_id);
  } else {
    likedUserIds.delete(like.liked_user_id);
  }
  return new Set(likedUserIds); // need a new set for new redux state
}
