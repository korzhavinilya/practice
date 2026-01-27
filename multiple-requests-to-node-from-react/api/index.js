const express = require('express');
const cors = require('cors');

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(cors());

async function getRandomValue() {
  const timeout = +(Math.random() * 3000).toFixed();
  return new Promise((res) => {
    setTimeout(() => {
      res(timeout);
    }, timeout);
  });
}

app.get('/a', async (req, res, next) => {
  const value = await getRandomValue();
  console.log('a');
  setTimeout(() => {
    res.json({ value });
  }, 1000);
});

app.get('/b', async (req, res, next) => {
  const value = await getRandomValue();
  console.log('b');
  setTimeout(() => {
    res.json({ value });
  }, 2000);
});

app.get('/c', async (req, res, next) => {
  const value = await getRandomValue();
  console.log('c');
  setTimeout(() => {
    res.json({ value });
  }, 3000);
});

app.listen(PORT, () => {
  console.log(`App is listening on`, PORT, `http://localhost:${PORT}`);
});
