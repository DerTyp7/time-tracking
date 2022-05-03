import Nav from "../components/Nav.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Table from "../components/table/Table.jsx";
import "../css/views/tableView.scss";

function TableView() {
	return (
		<div id="tableView">
			<Nav />
			<div className="tableView-container">
				<Table />
				<Sidebar />
			</div>
		</div>
	);
}

export default TableView;
