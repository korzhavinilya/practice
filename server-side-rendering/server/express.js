const express = require('express');
const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const app = express();

const { Hello } = require('../src/Hello');

app.get(
  /\.(js|css|map|ico)$/,
  express.static(path.resolve(__dirname, '../dist'))
);

app.use('*', async (req, res) => {
  let indexHTML = fs.readFileSync(
    path.resolve(__dirname, '../dist/index.html'),
    {
      encoding: 'utf8',
    }
  );

  let rootHtml = ReactDOMServer.renderToString(<Hello />);

  indexHTML = indexHTML.replace(
    '<div id="app"></div>',
    `<div id="app">${rootHtml}</div>`
  );

  res.contentType('text/html');
  res.status(200);

  return res.send(indexHTML);
});

app.listen('3001', () => {
  console.log('Express server started at http://localhost:3001');
});
