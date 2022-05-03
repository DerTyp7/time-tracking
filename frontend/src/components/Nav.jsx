/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import "../css/components/nav.scss";

import arrows from "../images/arrows.svg";

function Nav() {
	const params = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const [monthYear, setMonthYear] = useState(params.monthYear);
	const [month, setMonth] = useState(params.month);
	const [year, setYear] = useState(params.year);
	const [gz, setGz] = useState("+ 01:22");
	const [workingHours, setWorkingHours] = useState("07:00");
	let workingHoursChangeStep = 15;

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	useEffect(() => {
		setMonth(monthYear.split("-")[0]);
		setYear(monthYear.split("-")[1]);
		console.log(gz.substring(0, 1));
	}, [monthYear]);

	useEffect(() => {
		setMonthYear(params.monthYear);
	}, [location]);

	function nextMonth() {
		let month = parseInt(monthYear.split("-")[0]);
		let newUrl = "";

		if (month === 12) {
			newUrl = `/table/${1}-${parseInt(monthYear.split("-")[1]) + 1}`;
		} else {
			newUrl = `/table/${month + 1}-${monthYear.split("-")[1]}`;
		}

		navigate(newUrl, {
			replace: true,
		});
	}

	function previousMonth() {
		let month = parseInt(monthYear.split("-")[0]);
		let newUrl = "";

		if (month === 1) {
			newUrl = `/table/${12}-${parseInt(monthYear.split("-")[1]) - 1}`;
		} else {
			newUrl = `/table/${month - 1}-${monthYear.split("-")[1]}`;
		}
		navigate(newUrl, {
			replace: true,
		});
	}

	function plusWorkingHours() {
		let date = new Date("01/01/2000 " + workingHours);
		date.setMinutes(date.getMinutes() + workingHoursChangeStep);

		setWorkingHours(
			`${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${
				date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
			}`
		);
	}

	function minusWorkingHours() {
		let date = new Date("01/01/2000 " + workingHours);
		date.setMinutes(date.getMinutes() - workingHoursChangeStep);

		setWorkingHours(
			`${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${
				date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
			}`
		);
	}

	return (
		<div className="nav">
			<div>
				<div className="nav-overview">
					<a className="" href="/">
						Overview
					</a>
				</div>
			</div>
			<div>
				<div className="nav-info">
					<p
						className={
							gz.substring(0, 1) === "+" ? "text-positive" : "text-negative"
						}
					>
						{gz} GZ
					</p>
				</div>
			</div>
			<div className="month-navigation">
				<div
					className="nav-arrows-previous"
					style={{ backgroundImage: `url("${arrows}")` }}
					onClick={previousMonth}
				></div>
				<h3>
					{months[month - 1]} / {year}
				</h3>
				<div
					className="nav-arrow-next"
					style={{ backgroundImage: `url("${arrows}")` }}
					onClick={nextMonth}
				></div>
			</div>
			<div>
				<div className="working-hours">
					<div className="working-hours-input-block">
						<div className="working-hours-input-container">
							<button onClick={plusWorkingHours} id="workingHoursBtnPlus">
								+
							</button>
							<input type="text" name="workingHours" value={workingHours} />
							<button onClick={minusWorkingHours} id="workingHoursBtnMinus">
								<p>-</p>
							</button>
						</div>
					</div>

					<small>Working hours</small>
				</div>
			</div>
			<div className="nav-account">
				<p>Welcome back, Username!</p>
				<a className="logout-a" href="/logout">
					Log out
				</a>
			</div>
		</div>
	);
}

export default Nav;
