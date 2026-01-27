const express = require('express');
require('dotenv').config();
const bench = require('./bench');

const pid = process.pid;
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'default';

const app = express();

app.get('/', (req, res, next) => {
  console.log(pid, 'handle request');
  bench(500);
  res.send(`${pid} is serving you`);
});

app.delete('/', (req, res) => {
  console.log(pid, 'is going down');
  process.exit();

  // setTimeout(function () {
  //   throw new Error('We crashed!!!!!');
  // }, 10);
});

app.listen(PORT, () => {
  console.log(pid, 'listening on', PORT, 'env', NODE_ENV);
});
