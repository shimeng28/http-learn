const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  console.log('request come', req.url);
  console.log('request come', req.method);
  const html = fs.createReadStream('test.html');
  const img = fs.createReadStream('test.png');
  if (req.url === '/') {
    console.log('root');
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Connection': 'close',
    });
  
    html.pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'onnection': 'close',
    });
    img.pipe(res);
  }

}).listen(8888, () => {
  console.log('server is starting on port 8888 !!!');
})