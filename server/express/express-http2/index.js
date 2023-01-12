const express = require('express');
const http2Express = require('http2-express-bridge');
const http = require('http');
const http2 = require('http2');
const path = require('path');

const { readFile } = require('fs/promises');
const { readFileSync } = require('fs');

const PORT0 = 3000;
const PORT1 = 3001;
const app = http2Express(express);

app.use(express.static('public'));

app.get('/', async (req, res) => {
  if (res.push) {
    // TODO FInish push api
    // const assets = ['style.css'];
    // assets.forEach(async (file) => {
    //   res.push(file, {});
    //   res.end(await readFile(`./public/${file}`));
    // });
  }

  res.sendFile(path.join(__dirname, '/index.html'));
});

const options = {
  key: readFileSync('./server.key'),
  cert: readFileSync('./server.crt'),
  allowHTTP1: true,
};

const httpServer = http.createServer(app);
const httpsServer = http2.createSecureServer(options, app);

httpServer.listen(PORT0, () => {
  console.log('Listening http on port', PORT0);
});

httpsServer.listen(PORT1, () => {
  console.log('Listening https on port', PORT1);
});
