const cookieParser = require('cookie-parser');
const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
  //   res.send(req.headers.cookie);
  console.log(req.headers);
  res.send(req.cookies);
});

app.get('/a', (req, res) => {
  //   res.send(req.headers.cookie);
  console.log(req.headers);
  res.send(req.cookies);
});

app.post('/a', (req, res) => {
  const expireDate = new Date();
  expireDate.setSeconds(expireDate.getSeconds() + 50);

  // res.setHeader('Set-Cookie', [
  //   `visible=value;  expires=${expireDate.toGMTString()}`,
  //   `http_only=value; httpOnly; expires=${expireDate.toGMTString()}`
  // ]);

  res.cookie('visible', 'value', { expires: expireDate, path: '/a' });
  res.cookie('http_only', 'value', { httpOnly: true, expires: expireDate });
  res.send(201);
});

app.delete('/', (req, res) => {
  //   res.setHeader('Set-Cookie', [
  //     `visible=; expires=${new Date(0)}`,
  //     `http_only=; expires=${new Date(0)}`
  //   ]);

  res.clearCookie('visible');
  res.clearCookie('http_only');
  res.send(200);
});

app.listen(PORT, () => {
  console.log('Listening on', PORT);
});
