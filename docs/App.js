'use strict';

import React from "react";
import {Render} from "@greenio/react";
import {Head} from "@greenio/head";
import {Route, Router} from "@greenio/router";

const Hello = () => {
	return <div>
		<Head>
			<title>GreenJS Docs</title>
			<meta name="cache-control" content="public" />
			<link rel="stylesheet" href="App.css" />
		</Head>
		<Router>
			<Route path="/docs/intro" asyncPage={() => import("./src/topics/00_intro")} />
			<Route path="/docs/router" asyncPage={() => import("./src/topics/05_router")} />
			<Route path="/" asyncPage={() => import("./src/landing")}/>
		</Router>
	</div>
}

Render(<Hello />);