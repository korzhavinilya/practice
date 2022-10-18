import express from 'express';
import axios from 'axios';

const PORT_1 = 3001;
const PORT_2 = 3002;

const app = express();

app.get('/start', async (req, res) => {
  const abortController = new AbortController();
  axios
    .get(`http://localhost:${PORT_2}/timeout`, {
      signal: abortController.signal,
    })
    .then((response) => {
      res.send({ response: response.data });
    })
    .catch((error) => {
      console.log(PORT_1, 'catch', error.message);
    });

  setTimeout(() => {
    const message = 'Request aborted';
    console.log(PORT_1, message);
    abortController.abort();
    res.send({ message });
  }, 1000);
});

app.get('/timeout', async (req, res) => {
  console.log(PORT_2, 'Timeout created');
  setTimeout(() => {
    const message = 'Timeout fired';
    console.log(PORT_2, message);
    res.send({ message });
  }, 3000);
});

app.listen(PORT_1, () => {
  console.log('app1 started on port', PORT_1);
});

app.listen(PORT_2, () => {
  console.log('app2 started on port', PORT_2);
});
