import { Link } from "@greenio/router";
import React, { useContext } from "react";
import { Typography } from "@mui/material";
import "./Navbar.css";
import { COLOURS, ColourContext } from "../App";
import { Moon } from "react-feather";


const Navbar = () => {
    const { colour, setColour } = useContext(ColourContext);

    const fontStyles = {
        color: colour === COLOURS.LIGHT ? "black" : "white",
    };
    const moonColor = colour === COLOURS.LIGHT ? "black" : "white";

    return (
        <div className="Navbar--Div">
            <Link to="/" className="Navbar--Link">
                <Typography variant="h6" fontWeight="bold" style={{ ...fontStyles }}>
                    HOME
                </Typography>
            </Link>
            <Link to="/projects" className="Navbar--Link">
                <Typography variant="h6" fontWeight="bold" style={{ ...fontStyles }}>
                    PROJECTS
                </Typography>
            </Link>
            <div>
                <Moon 
                    color={moonColor}
                    onClick={() => {
                        if (colour === COLOURS.LIGHT) {
                            setColour(COLOURS.DARK);
                        } else {
                            setColour(COLOURS.LIGHT);
                        }
                    }} 
                />
            </div>
        </div>
    )
}

export {
    Navbar,
}