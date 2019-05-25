const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  console.log('request come', req.url);
  console.log('request come', req.method);
  if (req.url === '/') {
    console.log('root');
    const html = fs.createReadStream('test.html');
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
  
    html.pipe(res);
    // res.end();
  }
  

  if (req.url === '/script.js') {
    console.log(req.headers);
    const etag = req.headers['if-none-match'];
    console.log('etag...', etag);
    res.writeHead(200, {
      'Content-Type': 'text/javascript',
      'Cache-Control': 'max-age=2000000000, no-cache',
      'Last-Modified': '123',
      'Etag': '777',
    });

    res.end('console.log("script loaded tiwc")');
    // if (etag === '777') {
    //   res.writeHead(304, {
    //     'Content-Type': 'text/javascript',
    //     'Cache-Control': 'max-age=2000000000',
    //     'Last-Modified': '123',
    //     'Etag': '777',
    //   });

    //   res.end('');   
    // } else {
    // }
  }

}).listen(8888, () => {
  console.log('server is starting on port 8888 !!!');
})