const express = require('express');
const cors = require('cors');
const { EventEmitter } = require('events');

const eventEmitter = new EventEmitter();

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/messages', (req, res, next) => {
  eventEmitter.once('new-message', (message) => {
    res.send(message);
  });
});

app.post('/messages', (req, res, next) => {
  const message = req.body;
  eventEmitter.emit('new-message', message);
  res.status(200).end();
});

app.listen(PORT, () => {
  console.log('Long polling server is running on port', PORT);
});
