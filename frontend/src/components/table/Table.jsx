/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";

import { ServerContext } from "../../contexts/ServerContext";
import { useParams, useLocation } from "react-router-dom";

import "../../css/components/table/table.scss";

import Row from "./Row";

function Table() {
	const params = useParams();
	const location = useLocation();
	const { URL } = useContext(ServerContext);
	const weekDays = ["Sat.", "Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri."];
	const [entries, setEntries] = useState([]);
	const [monthYear, setMonthYear] = useState(params.monthYear);
	const [rows, setRows] = useState([]);

	async function fetchEntries() {
		// Set entries after fetching them from the server
		let response = await fetch(URL + `/api/entry/all/` + monthYear).then(
			(res) => res.json()
		);
		setEntries(response);
	}

	function daysInMonth() {
		let year = monthYear.split("-")[1];
		let month = monthYear.split("-")[0];

		return new Date(year, month, 0).getDate();
	}

	useEffect(() => {
		setMonthYear(params.monthYear);
	}, [location]);

	useEffect(() => {
		fetchEntries();
	}, [monthYear]);

	useEffect(() => {
		let month = monthYear.split("-")[0];
		let year = monthYear.split("-")[1];
		let temp_rows = [];

		for (let i = 1; i <= daysInMonth(); i++) {
			let date = `${i < 10 ? "0" + i : i}.${
				month < 10 ? "0" + month : month
			}.${year}`;

			let dayOfWeek = weekDays[new Date(year, month, i).getDay()];

			let entry = entries.find((entry) => entry.date === date);

			if (entry) {
				console.log(entry);
				temp_rows.push(
					<Row
						weekDay={dayOfWeek}
						date={entry.date}
						checkedIn={entry.checkedIn}
						checkedOut={entry.checkedOut}
						ind={entry.ind}
						norm={entry.norm}
						result={entry.result}
					/>
				);
			} else {
				temp_rows.push(<Row weekDay={dayOfWeek} date={`${date}`} />);
			}
		}
		setRows(temp_rows);
	}, [entries]);

	return (
		<div className="table-container">
			<table>
				<tr>
					<th>Weekday</th>
					<th>Date</th>
					<th>Checked in</th>
					<th>Checked out</th>
					<th>Ind</th>
					<th>Norm</th>
					<th>Result</th>
				</tr>
				{rows}
			</table>
		</div>
	);
}

export default Table;
