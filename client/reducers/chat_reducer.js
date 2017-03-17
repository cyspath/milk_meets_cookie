import {
  OPEN_CHAT,
  CLOSE_CHAT,
  FETCH_CHATS,
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
} from '../actions/types';

const INITIAL_STATE = {
  targetUser: {},
  messages: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case OPEN_CHAT:
      return { ...state, targetUser: action.payload };
    case CLOSE_CHAT:
      return { ...state, targetUser: {} };
    case FETCH_CHATS:
      debugger
      return { ...state };
    case SEND_MESSAGE:
      return { ...state, messages: state.messages.concat([action.payload]) };
    case RECEIVE_MESSAGE:
      return { ...state, messages: state.messages.concat([action.payload]) };
    default:
      return state;
  }
}
