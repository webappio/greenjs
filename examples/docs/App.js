'use strict';

import React from "react";
import {Render} from "@greenio/react";
import {Head} from "@greenio/head";
import {Route, Router} from "@greenio/router";
import Introduction from "./pages/introduction";
import Resources from "./pages/resources";
import { DocsLayout } from "./pages/common/docs-layout";

import "./App.css";

const Docs = () => {
	return <div>
		<Head>
			<title>Docs Template</title>
			<link rel='stylesheet' href="/App.css"/>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
		</Head>
		<DocsLayout>
			<Router>
				<Route path="/"><Introduction /></Route>
				<Route path="/resources"><Resources /></Route>
			</Router>
		</DocsLayout>
	</div>
}

Render(<Docs />);