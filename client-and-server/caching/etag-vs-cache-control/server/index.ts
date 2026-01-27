import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import generateData from './generateData';

const PORT = 3000;
const app = express();
app.use(
  cors({
    exposedHeaders: ['ETag']
  })
);

app.use(express.json());

const users = generateData();

function generateETag(data: any) {
  return crypto.createHash('md5').update(JSON.stringify(data)).digest('hex');
}

// logger
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get('/users', (req, res, next) => {
  console.log(200);
  res.json(generateData());
});

app.put('/users/:id', (req, res, next) => {
  console.log(200);
  res.json({ status: 'Updated' });
});

app.get('/etag', (req, res, next) => {
  const etag = generateETag(users);

  // позволяет серверу и клиенту согласовать, изменился ли ресурс, и управлять кэшированием на уровне верификации данных на сервере.
  // сервер в любом случае делает повторный запрос данных из бд
  // TODO но можно и оптимизировать
  if (req.headers['if-none-match'] === etag) {
    res.set('ETag', etag); // Устанавливаем ETag даже если ответ 304
    res.set('Content-Type', 'application/json'); // Устанавливаем Content-Type
    console.log(304);
    return res.status(304).end(); // 304 Not Modified
  }

  console.log(200);
  res.set('ETag', etag);
  res.json(users);
});

let cachedEtag = '';

app.get('/etag-optimized', (req, res, next) => {
  const requestEtag = req.headers['if-none-match'];

  if (!!cachedEtag && !!requestEtag && requestEtag === cachedEtag) {
    console.log(304);
    return res.status(304).end(); // 304 Not Modified
  }

  // тут можем запросить данные, но уже после того как поймём что они поменялись
  // cachedEtag будет храниться где-нибудь в redis
  console.log(200);
  res.json(users);
  const expressEtag = res.getHeader('ETag');
  console.log('Express generated ETag', expressEtag);
  cachedEtag = expressEtag as string;
});

app.get('/cache-control', (req, res, next) => {
  // указывает, как долго ресурс можно кэшировать. Это устанавливает общий период времени, в течение которого клиент или промежуточные кэши считают ресурс актуальным
  //   res.set('Cache-Control', 'public, max-age=10'); // 10 секунд клиент не вызывает повтоно сервер
  res.set('Cache-Control', 'public, max-age=10');

  console.log(200);
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`App is listening on`, PORT);
});
