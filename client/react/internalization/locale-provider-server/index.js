const express = require('express');
const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use((req, res, next) => {
  console.log(req.method);
  console.log(req.path);
  next();
});

app.use('/locales', express.static('locales'));

app.listen(3001, () => {
  console.log('App listening on', 3001);
});
