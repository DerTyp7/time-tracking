import React, { useState, useContext, useEffect } from "react";
import { ServerContext } from "../../contexts/ServerContext";
import { useParams } from "react-router-dom";

import "../../css/components/table.scss";

import Row from "./Row";
import Header from "./Header";

function Table() {
	const params = useParams();
	const { URL } = useContext(ServerContext);
	const [entries, setEntries] = useState([]);
	const [monthYear, setMonthYear] = useState(params.monthYear);

	async function fetchEntries() {
		let response = await fetch(URL + `/api/entry/all/` + monthYear);
		let data = await response.json();
		setEntries(data);
	}

	useEffect(() => {
		fetchEntries();
	}, []);

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
					checkedIn="Checked In"
					checkedOut="Checked Out"
					ind="Ind."
					norm="Norm."
				/>

				{/* ROWS */}
				{entries.map((entry, index) => (
					<Row
						date={entry.date}
						checkedIn={entry.checkedIn}
						checkedOut={entry.checkedOut}
						ind={entry.ind}
						norm={entry.norm}
					/>
				))}
			</div>
		</div>
	);
}

export default Table;
