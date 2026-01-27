const express = require('express');
const passport = require('./passport');

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(passport.initialize());

app.get('/', (req, res, next) => {
  req.login();
  req.logout();
  res.send(200);
});

app.listen(PORT, () => {
  console.log(`App is listening on`, PORT, `http://localhost:PORT`);
});
