import {
  OPEN_CHAT,
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
      // debugger
      return { ...state, targetUser: action.payload };
    case SEND_MESSAGE:
      return { ...state, messages: state.messages.concat([action.payload]) };
    case RECEIVE_MESSAGE:
      return { ...state, messages: state.messages.concat([action.payload]) };
    default:
      return state;
  }
}

// const findUser = (chats, id) => {
//   let found = false;
//   for(var i = 0; i < chats.length; i++) {
//     if (chat[i].user.id == id) {
//       found = true;
//       break;
//     }
//   }
//   return found;
// }
