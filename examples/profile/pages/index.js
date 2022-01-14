import React, { useContext } from "react";
import { Navbar } from "../common/Navbar";
import { COLOURS, ColourContext } from "../App";
import "./index.css";
import { Typography } from "@mui/material";
import { renderToStaticMarkup } from "react-dom/server";

const SVGBackground = ({ colour }) => {
    const lineColour = colour === COLOURS.DARK ? "white" : "black";
    const backgroundColor = colour === COLOURS.DARK ? "#292929" : "#F3F3F3";
    return (
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 818 509" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="818" height="509" fill={backgroundColor}/>
        <line x1="204.393" y1="423.086" x2="610.782" y2="82.0849" stroke={lineColour} stroke-width="3"/>
        </svg>
        
    )
};

const Index = () => {
    const { colour } = useContext(ColourContext);

    const textColour = colour === COLOURS.LIGHT ? "black" : "white";

    const svgString = encodeURIComponent(renderToStaticMarkup(<SVGBackground colour={colour} />));
	const svgBackground = {
		backgroundImage: `url("data:image/svg+xml,${svgString}")`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "cover",
	}

    return (
        <div className="Page-Background">
            <Navbar />
            <div className="Content--Container">
            <div className="Landing--Content container" style={{ ...svgBackground }}>
                <img 
                    src="https://gravatar.com/avatar/cf87186af82c89e977e3912eb8e9fbe6"
                    alt="Profile Image"
                    className="Landing--Content--Image Landing--Content--Item"
                />
                <Typography variant="h1" fontWeight="bold" className="Landing--Content--Item" color={textColour}>
                    YOUR NAME
                </Typography>
                <Typography variant="h4" fontWeight="normal" className="Landing--Content--Item" color={textColour}>
                    YOUR POSITION
                </Typography>
                <Typography variant="h6" fontWeight="normal" className="Landing--Content--Item" color={textColour}>
                    <a href="tel:+18888888888" style={{ color: textColour }}>+1 888-888-8888</a>
                </Typography>
                <Typography variant="h6" fontWeight="normal" className="Landing--Content--Item" color={textColour}>
                    <a href="mailto:something@email.com" style={{ color: textColour }}>something@email.com</a>
                </Typography>
            </div>
            </div>
        </div>
    )
}

export default Index;