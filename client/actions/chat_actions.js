import axios from 'axios';
import { jwtHeader } from './utils';
import socket from '../socketio_client';
import {
  OPEN_CHAT,
  CLOSE_CHAT,
  FETCH_MESSAGES,
  SEND_MESSAGE,
} from './types';

export function openChat(targetUser) {
  console.log('action: openChat, targetUser:', targetUser.username);
  return function(dispatch) {
    dispatch({ type: OPEN_CHAT, payload: targetUser }); // first set current chat target user
    axios
    .get('/api/chat/fetch_messages', jwtHeader({ targetUserId: targetUser.id })) // now retrieve the message history
    .then(resp => {
      console.log(resp.data);
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

// export function fetchChats(targetUser) {
//   console.log('action: fetchChats, targetUser:', targetUser.username);
//   return function(dispatch) {
//     dispatch({ type: OPEN_CHAT, payload: targetUser }); // first set current chat target user
//     axios
//     .get('/api/home/fetch_users', jwtHeader({})) // now retrieve the message history
//     .then(resp => {
//       console.log(resp.data);
//       dispatch({ type: FETCH_MESSAGES, payload: resp.data });
//     })
//     .catch((err) => {
//       dispatch(authError(err.response.data.error))
//     });
//   }
// }
