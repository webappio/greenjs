import React from "react";
import ReactDOM from "react-dom";
import {Helmet} from "react-helmet";
import {Route, Router} from "./router";

import Pricing from "./pages/pricing"
import Index from "./pages/index"

const Hello = () => {
	return <div>
		<Helmet>
			<title>greenjs app!</title>
			<meta charSet="utf-8"/>
			<meta name="cache-control" content="public" />
		</Helmet>
		<Router>
			<Route path="/pricing" exact>
				<Pricing />
			</Route>
			<Route path="/">
				<Index />
			</Route>
		</Router>
	</div>
}


ReactDOM.hydrate(
	<Hello />,
	document.getElementById("react-root")
);