const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  console.log('request come', req.url);
  console.log('request come', req.method);

  const host = req.headers.host;
  console.log('host...', host);
  if (req.url === '/') {
    const html = fs.createReadStream('test.html');
    
    if (host === 'a.test.com') {
      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Set-Cookie': ['id=123; max-age=2', 'name=456; HttpOnly; domain=test.com'],
      });
    }
  
    html.pipe(res);
    // res.end();
  }

}).listen(8888, () => {
  console.log('server is starting on port 8888 !!!');
})