const https = require('https');
const fs = require('fs');
const express = require('express');

const PORT = 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const server = https.createServer(
  {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt'),
  },
  app
);

server.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
