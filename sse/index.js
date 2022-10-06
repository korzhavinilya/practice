const express = require('express');
const cors = require('cors');
const ws = require('ws');
const http = require('http');

const PORT = 3000;

const app = express();

app.use(cors());

const server = http.createServer(app);
const websocketServer = new ws.Server({ server });

websocketServer.on('connection', (ws) => {
  console.log('A new client connected');
  ws.send('Welcome new client!');

  ws.on('message', (data) => {
    console.log(`received ${data}`);
    ws.send('Got your message', data);
  });
});

const stocks = [
  { id: 1, ticker: 'AAPL', price: 497.48 },
  { id: 2, ticker: 'MSFT', price: 213.02 },
  { id: 3, ticker: 'AMZN', price: 3284.72 },
];

function getRandomStock() {
  return Math.round(Math.random() * (2 - 0) + 0);
}

function getRandomPrice() {
  return Math.random() * (5000 - 20) + 20;
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/stocks', function (req, res) {
  res.status(200).json({ success: true, data: stocks });
});

app.get('/realtime-price', function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
  });

  setInterval(() => {
    res.write(
      'data:' +
        JSON.stringify({ ...stocks[getRandomStock()], price: getRandomPrice() })
    );
    res.write('\n\n');
  }, 2000);
});

app.listen(PORT, function () {
  console.log(`Server is running on ${PORT}`);
});
