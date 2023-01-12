const ws = require('ws');

const PORT = 3001;
const wss = new ws.Server(
  {
    port: PORT,
  },
  () => {
    console.log('Websocket server is running on port', PORT);
  }
);

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    message = JSON.parse(message);

    switch (message.event) {
      case 'message':
        broadcastMessage(message);
        break;
      case 'connection':
      default:
        broadcastMessage(message);
        break;
    }
  });
});

function broadcastMessage(message) {
  message = wss.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
}
