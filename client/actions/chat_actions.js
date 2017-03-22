import axios from 'axios';
import { jwtHeader } from './utils';
import socket from '../socketio_client';
import {
  OPEN_CHAT,
  CLOSE_CHAT,
  FETCH_MESSAGES,
  SEND_MESSAGE,
  FETCH_UNREAD_COUNT,
  FETCH_UNREAD_MESSAGES,
  UPDATE_MESSAGES_TO_READ,
} from './types';

export function openChat(currentUser, targetUser) {
  console.log('action: openChat(and fetch_messages), targetUser:', targetUser.username);
  return function(dispatch) {
    dispatch({ type: OPEN_CHAT, payload: targetUser }); // first set current chat target user
    axios
    .get('/api/chat/fetch_messages', jwtHeader({ targetUserId: targetUser.id })) // now retrieve the message history
    .then(resp => {
      dispatch({ type: FETCH_MESSAGES, payload: resp.data });
    })
    .catch((err) => {
      dispatch(authError(err.response.data.error))
    });
  }
}

export function closeChat() {
  console.log('action: closeChat');
  return function(dispatch) {
    dispatch({ type: CLOSE_CHAT });
  }
}

export function sendMessage(data) {
  console.log('action: sendMessage', data);
  socket.emit('chat message', data);
  return function(dispatch) {
    dispatch({ type: SEND_MESSAGE, payload: data });
  }
}

export function fetchUnreadCount() {
  console.log('action: fetchUnreadCount');
  return function(dispatch) {
    axios
    .get('/api/chat/unread_count', jwtHeader())
    .then(resp => {
      dispatch({ type: FETCH_UNREAD_COUNT, payload: resp.data.unreadCount });
    })
    .catch((err) => {
      dispatch(authError(err.response.data.error))
    });
  }
}

export function updateMessagesToRead(messages) {
  console.log('action: updateMessagesToRead');
  return function(dispatch) {
    axios
    .post('/api/chat/update_messages_to_read', messages, jwtHeader())
    .then(resp => {
      dispatch({ type: UPDATE_MESSAGES_TO_READ, payload: resp.data });
    })
    .catch((err) => {
      dispatch(authError(err.response.data.error))
    });
  }
}
