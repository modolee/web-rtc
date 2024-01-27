import { addEventListenerForActions } from './sender.js';
import { addEventListenerForWebSocket } from './listener.js';

export const webSocket = new WebSocket(`ws://${window.location.host}`, [
  'websoket',
]);

export const sendEvent = (event, data) => {
  webSocket.send(JSON.stringify({ event, data }));
};

export const sendMessage = (msg) => {
  sendEvent('message', msg);
};

const main = () => {
  addEventListenerForActions();
  addEventListenerForWebSocket();
};

main();
