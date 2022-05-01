import React, { useState, useContext, useEffect } from "react";
import { ServerContext } from "../../contexts/ServerContext";
import { useParams } from "react-router-dom";

import "../../css/components/table.scss";

import Row from "./Row";
import Header from "./Header";

function Table() {
	const params = useParams();
	const { URL } = useContext(ServerContext);
	const weekDays = ["Sat.", "Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri."];
	const [entries, setEntries] = useState([]);
	const [monthYear, setMonthYear] = useState(params.monthYear);
	const [rows, setRows] = useState([]);

	async function fetchEntries() {
		let response = await fetch(URL + `/api/entry/all/` + monthYear);
		let data = await response.json();
		setEntries(data);
	}

	function daysInMonth() {
		let year = monthYear.split("-")[1];
		let month = monthYear.split("-")[0];

		return new Date(year, month, 0).getDate();
	}

	useEffect(() => {
		fetchEntries();
	}, []);

	useEffect(() => {
		let month = monthYear.split("-")[0];
		let year = monthYear.split("-")[1];
		setRows([]);
		for (let i = 1; i <= daysInMonth(); i++) {
			let date = `${i < 10 ? "0" + i : i}.${
				month < 10 ? "0" + month : month
			}.${year}`;

			let dayOfWeek = weekDays[new Date(year, month, i).getDay()];

			let entry = entries.find((entry) => entry.date === date);

			if (entry) {
				setRows((...rows) => [
					rows,
					<Row
						date={entry.date}
						checkedIn={entry.checkedIn}
						checkedOut={entry.checkedOut}
						ind={entry.ind}
						norm={entry.norm}
					/>,
				]);
			} else {
				setRows((...rows) => [rows, <Row date={`${dayOfWeek} - ${date}`} />]);
			}
		}
		console.log(rows);
	}, [entries]);

	function nextMonth() {
		let month = parseInt(monthYear.split("-")[0]);

		if (month === 12) {
			window.location.href = `/table/${1}-${
				parseInt(monthYear.split("-")[1]) + 1
			}`;
		} else {
			window.location.href = `/table/${month + 1}-${monthYear.split("-")[1]}`;
		}
	}

	function previousMonth() {
		let month = parseInt(monthYear.split("-")[0]);

		if (month === 1) {
			window.location.href = `/table/${12}-${
				parseInt(monthYear.split("-")[1]) - 1
			}`;
		} else {
			window.location.href = `/table/${month - 1}-${monthYear.split("-")[1]}`;
		}
	}

	return (
		<div id="table">
			<div className="table-nav">
				<div onClick={previousMonth}> </div>
				<h2>{monthYear}</h2>
				<div onClick={nextMonth}> </div>
			</div>
			<div className="table-container">
				<Header
					date="Date"
					checkedIn="In"
					checkedOut="Out"
					ind="Ind."
					norm="Norm."
				/>
				{/* ROWS */}
				{rows}
			</div>
		</div>
	);
}

export default Table;
