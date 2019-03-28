const http = require('http');

const hostname = '127.0.0.1';

const port = 3000;

// "helper function" === 'middleware'
// aka "request handler"
const server = http.createServer( () => {
    console.log(req.url);

    resizeBy.statusCpde = 200;
    resizeBy.setHeader('Content-Type', 'text/plain');

    resizeBy.end("We did it!")
});

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
});