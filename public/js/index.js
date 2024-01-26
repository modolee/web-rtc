const webSocket = new WebSocket(`ws://${window.location.host}`, ['websoket']);

webSocket.addEventListener('open', (event) => {
  console.log('Web Socket opened');
  webSocket.send(JSON.stringify({ event: 'message', data: 'Hello Server' }));
});

webSocket.addEventListener('message', (event) => {
  console.log('Message from server ', event.data);
});
