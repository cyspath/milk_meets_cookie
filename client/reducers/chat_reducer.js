import {
  SEND_MESSAGE,
} from '../actions/types';

const INITIAL_STATE = {
  targetUser: {},
  chatBoxMessages: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEND_MESSAGE:
      return { ...state, targetUser: action.payload.targetUser, chatBoxMessages: action.payload.chatBoxMessages };
    default:
      return state;
  }
}
