import React, { useState } from "react";
import "./ProjectCard.css";
import { COLOURS } from "../App";
import { Typography } from "@mui/material";

const ProjectCard = ({ name = "", description = "", link = "", images = [], colour, setOpen, setProject }) => {
    const cardStyles = {
        backgroundColor: colour === COLOURS.LIGHT ? "white" : "#292929",
        border: `5px solid ${colour === COLOURS.LIGHT ? "#292929" : "white" }`
    }
    const textColour = colour === COLOURS.LIGHT ? "black" : "white";
    return (
        <>
            <div className="ProjectCard--Div" style={{ ...cardStyles }} 
            onClick={() => {
                setProject({
                    NAME: name,
                    DESCRIPTION: description,
                    LINK: link,
                    IMAGES: images
                });
                setOpen(true);
            }}
            >
                <Typography variant="h4" fontWeight="bold" color={textColour}>
                    {name}
                </Typography>
            </div>
        </>
    )
};

export {
    ProjectCard,
}