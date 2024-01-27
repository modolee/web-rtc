import { sendEvent, sendMessage } from './index.js';

export const addEventListenerForActions = () => {
  const nicknameForm = document.querySelector('#nickname');
  nicknameForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = nicknameForm.querySelector('input');
    sendEvent('nickname', input.value);
    input.value = '';
  });

  const messageForm = document.querySelector('#message');
  messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = messageForm.querySelector('input');
    sendMessage(input.value);
    input.value = '';
  });
};
