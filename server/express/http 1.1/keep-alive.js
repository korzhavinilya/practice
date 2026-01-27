const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

async function waitFor(res) {
  return new Promise((resolve) => {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        console.log('write');
        res.write('data: ' + (i + 1) + '\n\n');
        if (i === 2) {
          resolve(1);
        }
      }, i * 1000);
    }
  });
}

app.get('/connect', async (req, res) => {
  res.writeHead(200, {
    Connection: 'keep-alive', // set by default by Content-Type
    'Content-Type': 'text/event-stream'
  });

  await waitFor(res);
  console.log('end');
  res.end();
});

app.listen(port, function () {
  console.log(`Server listens on the port ${port}`);
});
