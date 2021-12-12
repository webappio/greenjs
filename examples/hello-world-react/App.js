'use strict';

import React from "react";
import {Render} from "@greenio/react";
import {Head} from "@greenio/head";
import {Route, Router} from "@greenio/router";

const Hello = () => {
	return <div>
		<Head>
			<title>greenjs app!</title>
			<meta name="cache-control" content="public" />
		</Head>
		<Router>
			<Route path="/pricing" exact asyncPage={() => import("./pages/pricing")} />
			<Route path="/" asyncPage={() => import("./pages/index")} />
		</Router>
	</div>
}

Render(<Hello />);