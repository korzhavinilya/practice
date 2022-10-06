import express from 'express';
import NodeCache from 'node-cache';

const PORT = 3000;
const app = express();
const cache = new NodeCache({ stdTTL: 15 });

app.get('/cache', (req, res) => {
  res.send({ cache: cache.data });
});

app.get('/fib/:num', (req, res) => {
  const { num } = req.params;
  const cacheKey = `fib(${num})`;
  if (cache.has(cacheKey)) {
    console.log(`Fib of ${num} was took from cache`);
    res.send({ result: cache.get(cacheKey) });
  } else {
    const value = fib(+num);
    cache.set(cacheKey, value);
    res.send({ result: value });
  }
});

app.get('/fac/:num', (req, res) => {
  const { num } = req.params;
  const cacheKey = `fac(${num})`;
  if (cache.has(cacheKey)) {
    console.log(`Fac of ${num} was took from cache`);
    res.send({ result: cache.get(cacheKey) });
  } else {
    const value = fac(+num);
    cache.set(cacheKey, value);
    res.send({ result: value });
  }
});

app.listen(PORT, () => {
  console.log('Server is running on the port', PORT);
});

function fib(n: number): number {
  if (n <= 0) {
    return 0;
  }
  if (n === 1 || n === 2) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
}

function fac(n: number): number {
  if (n <= 1) {
    return 1;
  }
  return n * fac(n - 1);
}
