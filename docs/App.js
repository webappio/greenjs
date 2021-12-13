'use strict';

import React from "react";
import {Render} from "@greenio/react";
import {Head} from "@greenio/head";
import {Link, Route, Router} from "@greenio/router";

const Landing = () => {
	return <main>
		<Head>
			<title>Prerendering react sites with esbuild | Better SEO without added complexity | GreenJS</title>
		</Head>
		<h1>Make performant sites with only Javascript</h1>
		<p>GreenJS turns regular client-side react into performant websites by pre-rendering every page with ESBuild and a headless browser.</p>
		<Link href="/docs/intro">View docs</Link>
	</main>
}

const Hello = () => {
	return <div>
		<Head>
			<title>GreenJS Docs</title>
			<meta name="cache-control" content="public" />
		</Head>
		<Router>
			<Route path="/docs/intro" exact asyncPage={() => import("./src/topics/00_intro")} />
			<Route path="/"><Landing /></Route>
		</Router>
	</div>
}

Render(<Hello />);