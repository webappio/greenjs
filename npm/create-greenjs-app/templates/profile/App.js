'use strict';

import React, { useState } from "react";
import {Render} from "@greenio/react";
import {Head} from "@greenio/head";
import {Route, Router} from "@greenio/router";
import Projects from "./pages/projects";
import Index from "./pages";
import "./App.css";
import { renderToStaticMarkup } from "react-dom/server";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./mui-theme";

const SVGBackground = ({ colour }) => {
    const lineColour = colour === COLOURS.DARK ? "white" : "black";
    return (
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1512 982" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line y1="-2.5" x2="708.024" y2="-2.5" transform="matrix(0.77181 0.635854 -0.64445 0.764646 0 531.8)" stroke={lineColour} strokeWidth="5"/>
        <line y1="-2.5" x2="666.665" y2="-2.5" transform="matrix(0.77181 0.635854 -0.649691 0.760198 997.462 0)" stroke={lineColour} strokeWidth="5"/>
        </svg>
    )
};

const COLOURS = {
	LIGHT: "light",
	DARK: "dark",
};

const ColourContext = React.createContext(COLOURS.LIGHT);

const Hello = () => {
	const [colour, setColour] = useState(COLOURS.LIGHT);


	const backgroundStyles = {
        color: colour === COLOURS.LIGHT ? "black" : "#292929",
        backgroundColor: colour === COLOURS.LIGHT ? "#F3F3F3" : "#292929",
    };
    const svgString = encodeURIComponent(renderToStaticMarkup(<SVGBackground colour={colour} />));
	const svgBackground = {
		backgroundImage: `url("data:image/svg+xml,${svgString}")`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "cover",
	}


	return (
		<ThemeProvider theme={theme}>
			<ColourContext.Provider value={{ colour, setColour }}>
				<div style={{ ...backgroundStyles, ...svgBackground }}>
					<Head>
						<title>Your Name | Profile</title>
						<link rel='stylesheet' href="/App.css"/>
						<meta name="viewport" content="width=device-width, initial-scale=1" />
					</Head>
					<Router>
						<Route path="/projects" ><Projects /></Route>
						<Route path="/"><Index /></Route>
					</Router>
				</div>
			</ColourContext.Provider>
		</ThemeProvider>
	)
}

export {
	COLOURS,
	ColourContext,
}

Render(<Hello />);