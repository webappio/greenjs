import React from "react";
import ReactDOM from "react-dom";
import {Helmet} from "react-helmet";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";

const Page = ({path}) => {
	const E = React.lazy(path);
	return <React.Suspense fallback={<>...</>}>
		<E/>
	</React.Suspense>
}

const Hello = () => {
	return <div>
		<Helmet>
			<title>framework.webapp.io app!</title>
			<meta charSet="utf-8"/>
			<meta name="cache-control" content="public" />
		</Helmet>
		<Router>
			<Routes>
				<Route path="/pricing" exact element={<Page path={() => import("./pages/pricing")}/>} />
				<Route path="/" element={<Page path={() => import("./pages/index")}/>} />
			</Routes>
		</Router>
	</div>
}

(window.DoHydrate ? ReactDOM.hydrate : ReactDOM.render)(
	<Hello />,
	document.getElementById("react-root")
);