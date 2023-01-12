const express = require('express');
const app = express();

const port = 3000;

app.use('/images', express.static(`${__dirname}/assets/images`));
app.use('/styles', express.static(`${__dirname}/css`));

app.listen(port, function () {
  console.log(`Server listens on the port ${port}`);
});
