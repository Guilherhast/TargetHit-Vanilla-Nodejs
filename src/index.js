const http = require('node:http'),
	Url = require('node:url'),
	path = require('node:path');

// Local imports
const StaticHandlerFactory = require('./staticHandler');

// Docs
// https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener
// https://nodejs.org/api/url.html#url-strings-and-url-objects
// https://www.w3schools.com/nodejs/nodejs_url.asp

// Constants
const publicDir = path.join(__dirname, './public');

// Functions
function isAPI(url){
	const pathname = Url.parse(url).pathname.split('/');
	return pathname[1].toLowerCase() == "api";
}

function handleAPI(req, res){
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify({data: 'Hello from api'}));
}

const handleStatic = StaticHandlerFactory(publicDir);

console.log(publicDir);

// Create a local server to receive data from
const server = http.createServer((req, res) => {

	if (isAPI(req.url)) handleAPI(req, res);
	else handleStatic(req, res);

});

server.listen(8000);
