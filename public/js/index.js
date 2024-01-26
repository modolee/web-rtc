import * as ws from './ws.js';

const messageList = document.querySelector('ul');
const messageForm = document.querySelector('form');

const handleSubmit = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector('input');
  ws.sendMessage(input.value);
  input.value = '';
};

messageForm.addEventListener('submit', handleSubmit);

ws.registerWebSocketListener();
