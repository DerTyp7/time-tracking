import React, { createContext } from "react";

export const ServerContext = createContext();

const ServerProvider = (props) => {
	const URL = "http://127.0.0.1:8080";
	return (
		<ServerContext.Provider value={{ URL }}>
			{props.children}
		</ServerContext.Provider>
	);
};

export default ServerProvider;
