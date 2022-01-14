'use strict';

import React from "react";
import {Render} from "@greenio/react";
import {Head} from "@greenio/head";
import {Route, Router} from "@greenio/router";
import Index from "./pages";
import { theme } from "./mui-theme";
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import '@brainhubeu/react-carousel/lib/style.css';

const Hello = () => {
	return <div>
		<Head>
			<title>SaaS Landing Page</title>
			<link rel='stylesheet' href="/App.css"/>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
		</Head>
		<div>
			<ThemeProvider theme={theme}>
				<Router>
					<Route path="/"><Index /></Route>
				</Router>
			</ThemeProvider>
		</div>
	</div>
}

Render(<Hello />);