const http = require('node:http'),
	Url = require('node:url'),
	path = require('node:path');

// Local imports
const StaticHandlerFactory = require('./staticHandler');
const apiHandlerFactory = require('./apiHandler');

// Docs
// https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener
// https://nodejs.org/api/url.html#url-strings-and-url-objects
// https://www.w3schools.com/nodejs/nodejs_url.asp

// Constants
const PORT  = 8000;
const publicDir = path.join(__dirname, 'public');
const dbFile = path.join(publicDir, 'top10.json');

// Functions
function isAPI(url){
	const pathname = Url.parse(url).pathname.split('/');
	return pathname[1].toLowerCase() == "api";
}

// Factorated functions
const handleStatic = StaticHandlerFactory(publicDir);
const handleAPI = apiHandlerFactory(dbFile);

// Create a local server to receive data from
const server = http.createServer((req, res) => {
	if (isAPI(req.url)) handleAPI(req, res);
	else handleStatic(req, res);
});

server.listen(PORT, ()=>console.log(`Server started on localhost:${PORT}`));
