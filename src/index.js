const http = require('node:http');

// Docs
// https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener

// Create a local server to receive data from
const server = http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type': 'application/json'});
	
	res.end(JSON.stringify({
		data: 'Hello World!',
	}));
});

server.listen(8000);
