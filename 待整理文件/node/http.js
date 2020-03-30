let http = require('http');


//server 由 createServer 构造函数返回的 Server 对象是一个 EventEmitter

let server = http.createServer((req, res) => {});

server.on('request', (req, res) => {

    let { method, url, headers } = req;

    let userAgent = headers['user-agent'];

    console.log( method, url, headers)

    let body = [];
    req.on('data', (chunk) => {
        console.log(chunk,'chunk')
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        res.setHeader('Access-Control-Allow-Origin',"*"); // 解决跨域请求
        // res.writeHead(200, { "content-Type":"text/html; charset='utf-8'" });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        // res.write('<h1>Node.js</h1>');
        res.end(`{
            'code': 10000,
            'data': ${body}
        }`); // 这里必须要有返回，不然浏览器会持续响应中

    }).on('error', (err) => {
        console.error(err.stack);
    })

});


server.listen(1995);
console.log('server run http://localhost:1995/');