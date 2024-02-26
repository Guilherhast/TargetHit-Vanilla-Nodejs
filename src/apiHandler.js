const fs = require("node:fs");

// https://frontendguruji.com/blog/how-to-parse-post-request-in-node-js-without-expressjs-body-parser/#:~:text=To%20parse%20the%20POST%20request,event%20and%20'end'%20event.&text=Above%20we%20are%20using%20Buffer,and%20returns%20a%20new%20Buffer.
// https://itnext.io/how-to-handle-the-post-request-body-in-node-js-without-using-a-framework-cd2038b93190
// https://stackoverflow.com/a/76494939/20217381

// Constants
const MAXENTRIES = 10;

// Calc functions
function compare(entry1, entry2){
	const ans = entry2.hits - entry1.hits;
	if (ans) return ans;
	return entry1.hits - entry2.hits;
}

function updateRanking(arr, data){
	arr.push(data);
	arr.sort(compare);
	arr.length = Math.min(arr.length, MAXENTRIES);
	return arr;
}

// IO functions
function readFile(filename){
	// No try let it crash
	return fs.readFileSync(filename).toString();
}

function writeFile(filename, data){
	fs.writeFile(filename, data, err => {if (err) console.log(err)});
}

function getRanking(file){
	let data;

	try {
		data = JSON.parse(readFile(file))
	}
	catch (err){
		if (err) console.log(err)
	}

	if (!Array.isArray(data)) data = [];
	return data;
}

// Body parsing functions
function getBoundary(req){
	return req.headers["content-type"].split("=")[1];
}

function getBodyJson(raw, boundary){
	return raw.split(`--${boundary}`)[1].split("\r\n").at(-2);
}

// Handlers
function apiHandlerFactory(dbFile){
	const top10 = getRanking(dbFile);

	const handlers = {
		GET: function (req, res){
			res.writeHead(200, {"Content-Type": "application/json"});
			res.end(JSON.stringify(top10));
		},
		POST: function (req, res){
			const boundary = getBoundary(req);
			let rawData = "";

			// Receive all data
			req.on("data", (chunck) => {
				rawData += chunck.toString();
			});

			// Send response when finished reading
			req.on("end", () => {
				const score = JSON.parse(getBodyJson(rawData, boundary));
				const updated = updateRanking(top10, score);

				// Update db
				writeFile(dbFile, JSON.stringify(updated, null, '\t'));

				// Send response
				res.writeHead(200, {"Content-Type": "application/json"});
				res.end(JSON.stringify(updated));
			});
		},
		Error: function (req, res){
			res.writeHead(404, {"Content-Type": "text/html"});
			res.end(JSON.stringify({error: "Not found"}));
		},
	};

	return function handleAPI(req, res){
		const key = handlers[req.method] ? req.method : "ERROR";
		handlers[key](req, res);
	}
}

module.exports = apiHandlerFactory;
