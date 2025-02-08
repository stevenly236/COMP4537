const http = require('http');

http.createServer(function (req, res) {
    console.log("hi");
    res.writeHead(200, {'Content-Type': 'text'});
    res.end('Hello <b>World!</b>');
}).listen(8888);

console.log('Server is running and listening ....');