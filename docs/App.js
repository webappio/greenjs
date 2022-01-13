'use strict';

import React from "react";
import {Render} from "@greenio/react";
import {Head} from "@greenio/head";
import {Route, Router, Redirect} from "@greenio/router";

const Site = () => {
	return <div>
		<Head>
			<title>GreenJS Docs</title>
			<meta name="cache-control" content="public" />
			<link rel="stylesheet" href="/App.css" />
			<link rel="stylesheet" href="/Site.css" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<script async src="https://www.googletagmanager.com/gtag/js?id=G-8QM8LHVH3P" />
			<script>{`
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());

				gtag('config', 'G-8QM8LHVH3P');
			`}
			</script>
		</Head>
		<Router>
			<Route asyncPage={() => import("./src/topics/getting-started/getting-started")} path="/docs/getting-started" />
			<Route path="/docs/hosting" asyncPage={() => import("./src/topics/getting-started/hosting")} />
			<Route path="/docs/examples" asyncPage={() => import("./src/topics/getting-started/examples")} />
			<Route path="/docs/why" asyncPage={() => import("./src/topics/getting-started/why")} />
			<Route path="/docs/router" asyncPage={() => import("./src/topics/react-components/router")} />
			<Route path="/docs/head" asyncPage={() => import("./src/topics/react-components/header")} />
			<Route path="/docs/esbuild" asyncPage={() => import("./src/topics/configuration/esbuild")} />
			<Route path="/docs/performance" asyncPage={() => import("./src/topics/configuration/performance")} />
			<Route path="/docs/plugins" asyncPage={() => import("./src/topics/configuration/plugins")} />
			<Route path="/docs/tailwindcss" asyncPage={() => import("./src/topics/integrations/tailwindcss")} />
			<Route path="/docs/nextjs-comparison" asyncPage={() => import("./src/topics/comparisons/nextjs")} />
			<Route path="/docs/vite-comparison" asyncPage={() => import("./src/topics/comparisons/vite")} />
			<Route path="/docs"><Redirect to="/docs/getting-started"/></Route>
			<Route path="/" asyncPage={() => import("./src/landing")}/>
		</Router>
	</div>
}

Render(<Site />);