const express = require('express');
const fs = require('fs');
const mime = require('mime-types');
const path = require('path');

const port = 3000;
const app = express();

const filePath = `${__dirname}/assets/image.jpg`;
// const filePath = `${__dirname}/assets/archive.pdf`;

const fileName = path.basename(filePath);
const contentType = mime.lookup(filePath);

const CONTENT_DISPOSITION = 'Content-Disposition';
const inlineContentDisposition = `inline; filename="${fileName}"`;

app.get('/sendfile', (req, res) => {
  fs.readFile(filePath, (err, file) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Could not download file');
    }

    res.contentType(contentType);

    // browser will display the file in a browser tab as a part of a web page
    res.setHeader(CONTENT_DISPOSITION, inlineContentDisposition);

    // browser will start downloading the file
    // res.setHeader(CONTENT_DISPOSITION, `attachment; filename="${basename}"`);

    res.send(file);
  });
});

app.get('/stream', async (req, res) => {
  const stream = fs.createReadStream(filePath);

  res.contentType(contentType);
  res.setHeader(CONTENT_DISPOSITION, inlineContentDisposition);

  stream.pipe(res);
});

app.get('/download', (req, res) => {
  // Applies attachment mode
  res.download(filePath);
});

app.get('/attachment', (req, res) => {
  res.attachment(filePath).send();
});

app.listen(port, function () {
  console.log(`Server listens on the port ${port}`);
});
