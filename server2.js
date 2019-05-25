const http = require('http');

http.createServer((req, res) => {
  console.log('request come', req.url);
  console.log('request come', req.method);
  res.writeHead(200, {
    // 'Access-Control-Allow-Origin': 'http://127.0.0.1:8888'
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Test-Cors',
    'Access-Control-Allow-Methods': 'PUT, POST, DELETE',
    'Access-Control-Max-Age': '1000',
  });
  res.end('alert(123)');
}).listen(8887, () => {
  console.log('server is starting on port 8887 !!!');
})