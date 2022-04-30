// Handlers which can be included into the request handler chain.

// Dependencies
const logger = require("../logger");

// better logging of requests
function LoggerHandler(req, res, next) {
	const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "")
		.split(",")[0]
		.trim()
		.split(":")[3]; // get the ip of the client

	if (req.method == "GET") {
		// If the request is a GET request
		logger.get(req.originalUrl, ip); // Log the request
	} else if (req.method == "POST") {
		// If the request is a POST request
		logger.post(req.originalUrl, ip); // Log the request
	}
	next(); // Continue to the next handler
}

module.exports = {
	LoggerHandler,
};
