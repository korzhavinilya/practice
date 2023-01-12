import express from 'express';
import clientRouter from './routes/client.route';
import dataSource from './typeorm-db';
import 'reflect-metadata';

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/api/v1/clients', clientRouter);

app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
