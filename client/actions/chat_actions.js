import socket from '../socketio_client';
import {
  OPEN_CHAT,
  SEND_MESSAGE,
} from './types';

export function openChat(targetUser) {
  console.log('action: openChat', targetUser);
  return function(dispatch) {
    dispatch({ type: OPEN_CHAT, payload: targetUser });
  }
}

export function sendMessage(data) {
  console.log('action: sendMessage', data);
  socket.emit('chat message', data);
  return function(dispatch) {
    dispatch({ type: SEND_MESSAGE, payload: data });
  }
}
