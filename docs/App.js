'use strict';

import React from "react";
import {Render} from "@greenio/react";
import {Head} from "@greenio/head";
import {Route, Router} from "@greenio/router";

const Site = () => {
	return <div>
		<Head>
			<title>GreenJS Docs</title>
			<meta name="cache-control" content="public" />
			<link rel="stylesheet" href="/App.css" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
		</Head>
		<Router>
			<Route path="/docs/basics" asyncPage={() => import("./src/topics/getting-started/basics")} />
			<Route path="/docs/installation" asyncPage={() => import("./src/topics/getting-started/installation")} />
			<Route path="/docs/examples" asyncPage={() => import("./src/topics/getting-started/examples")} />
			<Route path="/docs/core-concepts" asyncPage={() => import("./src/topics/getting-started/core-concepts")} />
			<Route path="/docs/router" asyncPage={() => import("./src/topics/react-components/router")} />
			<Route path="/docs/head" asyncPage={() => import("./src/topics/react-components/router")} />
			<Route path="/docs/esbuild" asyncPage={() => import("./src/topics/configuration/esbuild")} />
			<Route path="/docs/development" asyncPage={() => import("./src/topics/configuration/development")} />
			<Route path="/docs/performance" asyncPage={() => import("./src/topics/configuration/performance")} />
			<Route path="/docs/plugins" asyncPage={() => import("./src/topics/configuration/plugins")} />
			<Route path="/docs/tailwindcss" asyncPage={() => import("./src/topics/integrations/tailwindcss")} />
			<Route path="/docs/nextjs-comparison" asyncPage={() => import("./src/topics/comparisons/nextjs")} />
			<Route path="/docs/create-react-app-comparison" asyncPage={() => import("./src/topics/comparisons/cra")} />
			<Route path="/" asyncPage={() => import("./src/landing")}/>
		</Router>
	</div>
}

Render(<Site />);