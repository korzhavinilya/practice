import express from 'express';
import './';

import { getName } from './moduleA';

const PORT = 3000;
const app = express();

app.use(express.json());

let mdl = {
  getName() {
    return 'default';
  }
};

app.get('/', (req, res, next) => {
  res.send('Module: ' + mdl.getName());
});

app.post('/:moduleName', async (req, res, next) => {
  try {
    mdl = await import('./' + req.params.moduleName);
    res.send('Module is loaded');
  } catch (error) {
    console.log('error', error);

    res.status(400).send('Something went wrong...');
  }
});

app.listen(PORT, () => {
  console.log(`App is listening on`, PORT, `http://localhost:PORT`);
});
