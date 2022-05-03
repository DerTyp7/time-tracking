// Dependencies
const express = require("express");
const mysql = require("../../handlers/mysql_handler");
const logger = require("../../logger");
const request_handler = require("../../handlers/request_handler");

// Global variables
const con = mysql.con;
const router = express.Router();

function formatDate(date) {
	let result = date.split("T")[0].split("-");
	result = result[2] + "." + result[1] + "." + result[0];
	return result;
}

// Calculate time difference
function calcInd(date, checkedIn, checkedOut) {
	date = date.split("T")[0];
	let ind =
		(new Date(date + "T" + checkedOut) - new Date(date + "T" + checkedIn)) /
		1000 /
		60 /
		60;

	// round ind to 2 decimal places
	ind = Math.round(ind * 100) / 100;

	if (ind > 6) {
		ind -= 0.5;
	}

	return ind;
}

//! Bei dieser Funktion habe 112312 Gehirnzellen verloren. Bitte nicht drauf ansprechen.
function calcNorm(date, checkedIn, checkedOut) {
	let ind = calcInd(date, checkedIn, checkedOut).toString().split(".");

	let hours = parseInt(ind[0]);
	let minutes = 0;

	if (ind.length > 1) {
		minutes = parseInt(ind[1] * 6) / 10;
		minutes = Math.round(minutes);
	}

	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}

	return hours + ":" + minutes;
}

function formatTime(time) {
	let result = time.split(":");
	result = result[0] + ":" + result[1];
	return result;
}

function isInMonth(date, monthYear) {
	if (monthYear == undefined) {
		return true;
	}

	date = date.split("-");
	let month = parseInt(date[1]);
	let year = parseInt(date[0]);
	monthYear = monthYear.split("-");
	if (month == monthYear[0] && year == monthYear[1]) {
		return true;
	} else {
		return false;
	}
}

// monthYear = month number-year number (04-2019)
router.get("/all/:monthYear?", request_handler.LoggerHandler, (req, res) => {
	const monthYear = req.params.monthYear;

	con.query(`SELECT * FROM entries ORDER BY date ASC`, (err, result) => {
		if (err) {
			logger.error(err, "routes/api/entries.js");
			res.send(JSON.parse(JSON.stringify({ error: err }))); // Send error message
			return;
		} else {
			let entries = [];
			result = JSON.parse(JSON.stringify(result));

			for (let i = 0; i < result.length; i++) {
				if (isInMonth(result[i].date, monthYear)) {
					entries.push({
						date: formatDate(result[i].date),
						checkedIn: formatTime(result[i].checked_in),
						checkedOut: formatTime(result[i].checked_out),
						ind: calcInd(
							result[i].date,
							result[i].checked_in,
							result[i].checked_out
						),
						norm: calcNorm(
							result[i].date,
							result[i].checked_in,
							result[i].checked_out
						),
						result: "-1:20",
					});
				}
			}

			res.send(entries); // Send result
		}
	});
});

module.exports = router;
