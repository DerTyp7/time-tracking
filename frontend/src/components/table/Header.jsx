import "../../css/components/table.scss";

function Header({ date, checkedIn, checkedOut, ind, norm }) {
	return (
		<div className="table-header">
			<div className="table-cell">
				<span>{date}</span>
			</div>
			<div className="table-cell">
				<span>{checkedIn}</span>
			</div>
			<div className="table-cell">
				<span>{checkedOut}</span>
			</div>
			<div className="table-cell">
				<span>{ind}</span>
			</div>
			<div className="table-cell">
				<span>{norm}</span>
			</div>
		</div>
	);
}

export default Header;
