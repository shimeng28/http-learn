const http = require('http');
const fs = require('fs');

const wait = seconds => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), seconds * 1000);
  }) 
};


http.createServer((req, res) => {
  console.log('request come', req.url);
  console.log('request come', req.method);

  const host = req.headers.host;
  console.log('host...', host);
  if (req.url === '/') {
    const html = fs.createReadStream('test.html');
    
    if (host === 'a.test.com') {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
    }
  
    html.pipe(res);
    // res.end();
  }

  if (req.url === '/data') {
    res.writeHead(200, {
      'Cache-Control': 's-maxage=200',
      'Vary': 'X-Test-Cache'
    });
    wait(2).then(() => res.end('success'));
  }
}).listen(8888, () => {
  console.log('server is starting on port 8888 !!!');
})