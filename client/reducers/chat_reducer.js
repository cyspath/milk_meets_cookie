import {
  OPEN_CHAT,
  CLOSE_CHAT,
  FETCH_MESSAGES,
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  FETCH_UNREAD_COUNT,
  FETCH_UNREAD_MESSAGES,
} from '../actions/types';

const INITIAL_STATE = {
  targetUser: {},
  messages: [],
  unreadCount: 0,
  unreadMessages: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {

    case OPEN_CHAT:
      return {
        ...state,
        targetUser: action.payload
      };

    case CLOSE_CHAT:
      return {
        ...state,
        targetUser: {}
      };

    case FETCH_MESSAGES:
      return {
        ...state,
        messages: action.payload.messages,
        unreadCount: action.payload.unreadCount
      };

    case SEND_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat([action.payload])
      };

    case RECEIVE_MESSAGE:
      var count = action.payload.sender_id === state.targetUser.id ? state.unreadCount : state.unreadCount + 1;
      return {
         ...state,
         messages: state.messages.concat([action.payload]),
         unreadCount: count
       };

    case FETCH_UNREAD_COUNT:
      return {
        ...state,
        unreadCount: action.payload
      };

    case FETCH_UNREAD_MESSAGES:
      return {
        ...state,
        unreadMessages: action.payload
      };

    default:
      return state;
  }
}
