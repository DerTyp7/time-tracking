/*
 * Handles the connection to the MySQL database
 * - Connects to the database
 */

// Dependencies
const mysql = require("mysql");
const configFile = require("../config");
const logger = require("../logger");

// Global variables
const config = configFile.config;

// Connection to the database
const con = mysql.createConnection({
	host: config.db.host,
	user: config.db.user,
	password: config.db.password,
	database: config.db.database,
});

con.connect(function (err) {
	if (err) throw err;
	logger.info(
		`Connected to MySQL`,
		`${config.db.user}@${config.db.host}/${config.db.database}`
	);
});

con.on("error", () => {
	logger.error("MySQL Error");
});

module.exports = { con };
