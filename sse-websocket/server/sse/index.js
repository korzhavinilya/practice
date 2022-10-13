const express = require('express');
const cors = require('cors');
const { EventEmitter } = require('events');

const eventEmitter = new EventEmitter();

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/connect', (req, res, next) => {
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
  });

  eventEmitter.on('new-message', (message) => {
    res.write('data: ' + JSON.stringify(message) + '\n\n');
  });
});

app.post('/messages', (req, res, next) => {
  const message = req.body;
  eventEmitter.emit('new-message', message);
  res.status(200).end();
});

app.listen(PORT, () => {
  console.log('SSE server is running on port', PORT);
});
