const express = require('express');
const http2Express = require('http2-express-bridge');
const http2 = require('http2');
const path = require('path');
const { readFileSync } = require('fs');

const app = http2Express(express);

const options = {
  key: readFileSync('./server.key'),
  cert: readFileSync('./server.crt'),
  allowHTTP1: true
};

// this will create a static path from which files are served
const staticPath = path.join(__dirname, '<Path>');

app.use(express.static(staticPath));

app.get('/bar', (req, res) => {
  // This accepts a single path or an array of paths. Path should be same as the ones in html below
  // Second argument is the Root directory from which the files are being served
  res.push(['/bar.js', '/foo.js'], staticPath);
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Bar Document</title>
            </head>
            <body>
                This is a bar document.
                <script src="/foo.js"></script>
                <script src="/bar.js"></script>
            </body>
        </html>`);
});

const server = http2.createSecureServer(options, app);

server.listen(3000, () => {
  console.log(`listening on port 3000`);
});
