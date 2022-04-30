import "../../css/components/table.scss";

function Row({ date, checkedIn, checkedOut, ind, norm }) {
	return (
		<div className="table-row">
			<div className="table-cell">
				<span>{date ? date : "-"}</span>
			</div>
			<div className="table-cell">
				<span>{checkedIn ? checkedIn : "-"}</span>
			</div>
			<div className="table-cell">
				<span>{checkedOut ? checkedOut : "-"}</span>
			</div>
			<div className="table-cell">
				<span>{ind ? ind : "-"}</span>
			</div>
			<div className="table-cell">
				<span>{norm ? norm : "-"}</span>
			</div>
		</div>
	);
}

export default Row;
