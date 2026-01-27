const http = require('http');
const util = require('util');

var reqCounter = 0;

http
  .createServer(function (req, res) {
    var reqId = ++reqCounter;
    var start = new Date().getSeconds();

    setTimeout(reply, 3000);

    function reply() {
      var finish = new Date().getSeconds();
      var response = util.format(
        'ID: %s Path: %s In: %s Out: %s',
        reqId,
        req.url,
        start,
        finish
      );
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(JSON.stringify(response));
    }
  })
  .listen(8888);
