import express from 'express';
import * as dotenv from 'dotenv';
import { apiRouter } from './routers/api.router';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log('App is listening on the port', PORT);
});

export default app;
