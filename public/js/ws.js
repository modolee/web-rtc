const webSocket = new WebSocket(`ws://${window.location.host}`, ['websoket']);

export const registerWebSocketListener = () => {
  webSocket.addEventListener('open', (msg) => {
    console.log('Server connected ✅');
    webSocket.send(
      JSON.stringify({ event: 'join', data: { name: 'modolee' } }),
    );
  });

  webSocket.addEventListener('message', (msg) => {
    const { event, data } = JSON.parse(msg.data);

    switch (event) {
      case 'join':
        console.log(`Join message from server ${data}`);
        break;
      case 'message':
        console.log(`Message from server: ${data}`);
        break;
    }
  });
};

export const sendMessage = (msg) => {
  webSocket.send(JSON.stringify({ event: 'message', data: msg }));
};
