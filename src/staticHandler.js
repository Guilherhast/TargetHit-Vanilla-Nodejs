const Url = require('node:url'),
	fs = require('node:fs'),
	path = require('node:path');

// Constants
const mimeTypes = {
	"html": "text/html",
	"css": "text/css",
	"js": "text/javascript",
	"png": "image/png",
	"jpeg": "image/jpeg",
};

// Functions
function normalizePath(pathStr){
	const isDir = pathStr.at(-1) == '/';
	return isDir? path.join(pathStr.toLowerCase(), "index.html"): pathStr.toLowerCase();
}

function getFileName(url, dir){
	const href = Url.parse(url, true);
	const filename = path.join(dir, normalizePath(href.pathname));

	return filename;
}

// Factory
function StaticHandlerFactory(staticDir){
	return function (req, res){
		const filename = getFileName(req.url, staticDir);

		const mime = mimeTypes[filename.split('.').at(-1)] || 'text/plain';

		fs.readFile(filename, function (err, data){
			// Deu ruim
			if (err){
				res.writeHead(404, {'Content-Type': 'text/html'});
				return res.end("<h1>404 Not Found</h1>");
			}
			// Deu bom
			res.writeHead(200, {'Content-Type': mime});
			res.write(data);
			return res.end();
		});
	}
}

module.exports = StaticHandlerFactory;
