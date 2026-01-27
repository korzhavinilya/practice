import express from 'express';
import test from 'assets/test.ts';

const PORT = 3000;
const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
  res.send(200);
});

app.listen(PORT, () => {
  console.log(`App is listening on`, PORT);
});
