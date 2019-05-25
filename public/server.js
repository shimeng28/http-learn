const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  console.log('request come', req.url);
  console.log('request come', req.method);

  if (req.url === '/' || req.url === '/index.html') {
    const html = fs.createReadStream('./test.html');
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Cache-Control': 'max-age=2000, no-cache'
    });
    html.pipe(res);
  }

  if (req.url === '/script.js') {
    const ifModifiedSince = req.headers['if-modified-since'];
    console.log(ifModifiedSince);
    if (ifModifiedSince === '555') {
      console.log(111);
      res.writeHead(304);
      res.end();
    }
    else {
      const js = fs.createReadStream('./script.js');
      res.writeHead(200, {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'max-age=2000',
        'Last-Modified': 555,
        'Etag': 777,
      });
      js.pipe(res);
    }
  }

}).listen(8888, () => {
  console.log('server is starting on port 8888 !!!');
})