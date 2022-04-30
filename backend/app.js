// Dependencies
const express = require("express");
const configFile = require("./config");
const logger = require("./logger");
const cors = require("cors");

// Global variables
const app = express();
const config = configFile.config;
const port = config.port;

// Routes
const apiEntry = require("./routes/api/entry");

// Set up the express server
app.use(cors());

app.use(express.json()); // Parse JSON data from requests
app.use(express.urlencoded({ extended: true })); // Parse URL encoded data from requests

// routes
app.use("/api/entry", apiEntry);

// Start the express server
app.listen(port, () => logger.info("Server started", `Port: ${port}`));
