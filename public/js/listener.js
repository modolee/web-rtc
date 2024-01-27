import { webSocket, sendEvent } from './index.js';

const addMessageToMessageList = (msg) => {
  const messageList = document.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = msg;
  messageList.append(li);
};

export const addEventListenerForWebSocket = () => {
  webSocket.addEventListener('open', (msg) => {
    console.log('Server connected ✅');
    sendEvent('join');
  });

  webSocket.addEventListener('message', (msg) => {
    const { event, data } = JSON.parse(msg.data);

    switch (event) {
      case 'join':
        addMessageToMessageList(data);
        break;
      case 'nickname':
        addMessageToMessageList(`You got a new name '${data}'`);
        break;
      case 'message':
        console.log({ mine: data.mine });
        addMessageToMessageList(
          `${data.mine ? 'You' : data.nickname}: ${data.message}`,
        );
        break;
    }
  });
};
