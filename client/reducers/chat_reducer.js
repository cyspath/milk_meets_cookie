import {
  FETCH_INBOX,
  OPEN_CHAT,
  CLOSE_CHAT,
  FETCH_MESSAGES,
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  FETCH_UNREAD_COUNT,
  UPDATE_MESSAGES_TO_READ,
} from '../actions/types';

const INITIAL_STATE = {
  targetUser: {},
  messages: [],
  unreadCount: 0,
  unreadMessages: [],
  inbox: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {

    case FETCH_INBOX:
      return {
        ...state,
        inbox: action.payload
      };

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
      var count;
      if (messageBoxFocused() && action.payload.sender_id === state.targetUser.id) {
        console.log('RECEIVE_MESSAGE: read (message box focused, sender_id = targetUser.id)');
        count = state.unreadCount;
      } else {
        console.log('RECEIVE_MESSAGE: unread');
        count = state.unreadCount + 1;
      }
      var messages = state.messages;
      if (action.payload.sender_id === state.targetUser.id) {
        messages = state.messages.concat([action.payload]);
      }
      return {
         ...state,
         messages: messages,
         unreadCount: count
       };

    case FETCH_UNREAD_COUNT:
      return {
        ...state,
        unreadCount: action.payload
      };

    case UPDATE_MESSAGES_TO_READ:
      var newMessages = updateMessagesToReadByIds(action.payload.updatedToReadIds, state.messages);
      return {
        ...state,
        messages: newMessages,
        unreadCount: action.payload.unreadCount
      };

    default:
      return state;
  }
}

const messageBoxFocused = () => {
  return document.activeElement === document.getElementById('message-box')
};

const updateMessagesToReadByIds = (ids, messages) => {
  const setIds = new Set(ids);
  const newMessages = messages.slice();
  for (var i = 0; i < newMessages.length; i++) {
    if (setIds.has(newMessages[i].id)) {
      newMessages[i].read = true;
    }
  }
  return newMessages;
};
