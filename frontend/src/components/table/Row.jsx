import "../../css/components/table/table.scss";

function Row({ weekDay, date, checkedIn, checkedOut, ind, norm, result }) {
	return (
		<tr>
			<td>{weekDay ? weekDay : "-"}</td>
			<td>{date ? date : "-"}</td>
			<td>{checkedIn ? checkedIn : "-"}</td>
			<td>{checkedOut ? checkedOut : "-"}</td>
			<td>{ind ? ind : "-"}</td>
			<td>{norm ? norm : "-"}</td>
			<td>{result ? result : "-"}</td>
		</tr>
	);
}

export default Row;
