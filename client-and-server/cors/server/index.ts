import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// app.use(cors());

// app.use(
//   cors({
//     origin: 'http://localhost:5173'
//   })
// );

app.use((req, res, next) => {
  console.log(req.headers.origin, req.method, req.path);
  next();
});

app.use('/', (req, res, next) => {
  console.log('Set headers...');

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, X-Custom-Header, Cookie'
  );
  res.setHeader('Access-Control-Allow-Credentials', true as any);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  next();
});

app.get('/', (req: Request, res: Response) => {
  console.log('Return response...');
  res.send({ message: 'hello' });
});

app.post('/', (req: Request, res: Response) => {
  console.log('Make changes...');
  console.log('Return response...');
  res.send({ message: 'transaction is performed' });
});

app.post('/cookie', (req, res) => {
  res.cookie('key', 'value');
  res.send({ message: 'cookie is set' });
});

app.get('/cookie', (req, res) => {
  console.log(req.headers.cookie);
  res.send({ cookie: req.headers.cookie });
});

app.delete('/cookie', (req, res) => {
  res.clearCookie('key');
  res.send({ message: 'cookie is deleted' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
