const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  // res.send(201);
  console.log(123);
});

app.listen(3001, () => {
  console.log('Server is up on port 3000');
});
