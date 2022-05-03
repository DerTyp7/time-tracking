import "./css/app.scss";
import ServerProvider from "./contexts/ServerContext";
import TableView from "./views/TableView";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<ServerProvider>
			<div id="app">
				<Router>
					<Routes>
						<Route exact path="/table/:monthYear" element={<TableView />} />
					</Routes>
				</Router>
			</div>
		</ServerProvider>
	);
}

export default App;
