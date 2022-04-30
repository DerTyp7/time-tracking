import "./css/app.scss";
import ServerProvider from "./contexts/ServerContext";
import Table from "./components/table/Table";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<ServerProvider>
			<div id="app">
				<div id="content" className="app-container">
					<Router>
						<Routes>
							<Route exact path="/table/:monthYear" element={<Table />} />
						</Routes>
					</Router>
				</div>
				<div id="sidebar" className="app-container">
					<h1>Sidebar</h1>
				</div>
			</div>
		</ServerProvider>
	);
}

export default App;
