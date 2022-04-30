const SHOW_TIME = true;

function getTimestamp() {
	let date_ob = new Date();

	// current date
	// adjust 0 before single digit date
	let date = ("0" + date_ob.getDate()).slice(-2);

	// current month
	let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

	// current year
	let year = date_ob.getFullYear();

	// current hours
	let hours = ("0" + date_ob.getHours()).slice(-2);

	// current minutes
	let minutes = ("0" + date_ob.getMinutes()).slice(-2);

	// current seconds
	let seconds = ("0" + date_ob.getSeconds()).slice(-2);

	if (SHOW_TIME) {
		return hours + ":" + minutes + ":" + seconds;
	} else {
		return null;
	}
}

function cmd(msg, info = null) {
	console.log(
		"\x1b[36m%s\x1b[0m",
		`${
			getTimestamp() != null ? "[" + getTimestamp() + "]" : ""
		}[COMMAND] ${msg} ${info != null ? "- " + info : ""}`
	);
}

function info(msg, info = null) {
	console.log(
		"\x1b[37m%s\x1b[0m",
		`${getTimestamp() != null ? "[" + getTimestamp() + "]" : ""}[INFO] ${msg} ${
			info != null ? "- " + info : ""
		}`
	);
}

function error(msg, info = null) {
	console.log(
		"\x1b[31m%s\x1b[0m",
		`${
			getTimestamp() != null ? "[" + getTimestamp() + "]" : ""
		}[ERROR] ${msg} ${info != null ? "- " + info : ""}`
	);
}

function get(msg, info = null) {
	console.log(
		"\x1b[37m\x1b[2m%s\x1b[0m",
		`${getTimestamp() != null ? "[" + getTimestamp() + "]" : ""}[GET] ${msg} ${
			info != null ? "- " + info : ""
		}`
	);
}

function post(msg, info = null) {
	console.log(
		"\x1b[37m\x1b[2m%s\x1b[0m",
		`${getTimestamp() != null ? "[" + getTimestamp() + "]" : ""}[POST] ${msg} ${
			info != null ? "- " + info : ""
		}`
	);
}

function socket(msg, type) {
	console.log(
		"\x1b[35m\x1b[1m%s\x1b[0m",
		`${
			getTimestamp() != null ? "[" + getTimestamp() + "]" : ""
		}[SOCKET.IO][${type}] ${msg}`
	);
}

function event(msg, type) {
	console.log(
		"\x1b[35m\x1b[1m%s\x1b[0m",
		`${
			getTimestamp() != null ? "[" + getTimestamp() + "]" : ""
		}[EVENT][${type}] ${msg}`
	);
}

module.exports = {
	cmd,
	info,
	error,
	get,
	post,
	socket,
	event,
};
