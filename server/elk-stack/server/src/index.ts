import express from 'express';
import { Request, Response } from 'express';
// import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';
import { logstashLogger } from './logging/logstashLogger';

dotenv.config();

// const client = new Client({ node: process.env.ELASTIC_URL });

const app = express();

app.use('', (req, res, next) => {
  const { method, path } = req;
  logstashLogger.info('Handled request', { method, path });
  next();
});

app.get('/', (req, res) => {
  res.status(201).send('Hello world!');
});

// app.get('/', async (req: Request, res: Response) => {
//   const result = await client.search({
//     index: 'mflix_users'
//   });
//   res.send(result);
// });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  logstashLogger.info('Application started on port', PORT);
});
