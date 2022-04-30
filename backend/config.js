const config = {
	db: {
		host: "127.0.0.1",
		user: "root",
		password: "", // In production: "InfraTag!" SORRY FOR CLEAR TEXT PASSWORD
		database: "rme-time-tracking",
	},
	port: 8080, // Port for the server
};

module.exports = { config };
