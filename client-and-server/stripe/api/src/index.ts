import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes';
import errorHandler from './middlewares/error-handler.middleware';
import Logger from './logger';

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(cors());
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      (req as any).rawBody = buf;
    }
  })
);

app.use('/api', router);
app.use(errorHandler);

app.listen(PORT, () => {
  Logger.info(`Server is running on http://localhost:${PORT}`);
});
