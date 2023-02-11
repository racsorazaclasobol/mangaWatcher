import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { MangaApp } from "./MangaApp";
import { store } from "./store/store";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={ store }>
			<BrowserRouter>
			{/* <HashRouter> */}
				<MangaApp />
			{/* </HashRouter> */}
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
