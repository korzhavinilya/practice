import express from 'express';
import { CPU } from './bench';
const workerpool = require('workerpool');

const PORT = 3000;
const app = express();

const filePath = __dirname + '/workerpool-worker.js';
const pool = workerpool.pool(filePath);

app.use(express.json());

app.get('/single', (req, res, next) => {
  const result = CPU(500);
  res.end(JSON.stringify({ result: result.length }));
});

app.get('/workerpool', async (req, res, next) => {
  const result = await pool.exec('CPU', [500]);
  res.end(JSON.stringify({ result: result.length }));
});

app.listen(PORT, () => {
  console.log(`App is listening on`, PORT, `http://localhost:${PORT}`);
});
