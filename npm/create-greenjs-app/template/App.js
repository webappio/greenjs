'use strict';

import React from "react";
import {Render} from "@greenio/react";
import {Head} from "@greenio/head";
import {Link, Route, Router} from "@greenio/router";
import Pricing from "./pages/pricing";
import Index from "./pages";

import "./App.css";

const Hello = () => {
	return <div>
		{/*<Head> is how to specify metadata about the page*/}
		{/*Read more here: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML*/}
		<Head>
			<title>greenjs app!</title>
			<link rel='stylesheet' href="/App.css"/>
		</Head>
		{/*Router lets you specify multiple pages, in this case one at localhost:8000/pricing and one at localhost:8000*/}
		<main className="flex flex-col">
			<main className="flex items-center bg-emerald-900">
				<div className="flex items-center font-bold container mx-8 py-4">
					<Link href="/">
						<img src="/static/greenjs-white.svg" width="128" height="34" alt="GreenJS logo"/>
					</Link>
					<Link href="/pricing" className="mx-8 text-white text-lg">
						PRICING
					</Link>
				</div>
			</main>
			<div className="bg-emerald-400">
				<Router>
					<Route path="/pricing" ><Pricing /></Route>
					<Route path="/"><Index /></Route>
				</Router>
			</div>
		</main>
	</div>
}

Render(<Hello />);