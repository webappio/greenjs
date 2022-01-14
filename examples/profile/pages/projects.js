import React, { useContext, useState } from "react";
import {Head} from "@greenio/head";
import { Navbar } from "../common/Navbar";
import { ProjectCard } from "../common/ProjectCard";
import { ColourContext, COLOURS } from "../App";
import { Dialog, Typography } from "@mui/material";
import "./projects.css";


const PROJECTS = [
    {
        NAME: "PROJECT 1",
        DESCRIPTION: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        LINK: "https://greenjs.io",
        IMAGES: [
        "", 
        ""
        ],
    },
    {
        NAME: "ANOTHER PROJECT",
        DESCRIPTION: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        LINK: "https://greenjs.io",
        IMAGES: [],
    },
];

const Projects = () => {
    const [project, setProject] = useState({});
    const [open, setOpen] = useState(false);
    const { colour } = useContext(ColourContext);
    const textColour = colour === COLOURS.LIGHT ? "black" : "white";
    const backgroundColor = colour === COLOURS.LIGHT ? "#F3F3F3" : "#292929";

    const linkStyles = {
        color: textColour,
        backgroundColor: backgroundColor,
        border: `5px solid ${textColour}`,
    };

    return (
        <>
        <Head>
            <title>Your Name | Projects</title>
            <link rel='stylesheet' href="/App.css"/>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Dialog
            fullWidth
            maxWidth="lg"
            open={open}
            onClose={() => setOpen(false)}
        >
            <div className="Project--Dialog" style={{ backgroundColor: backgroundColor }}>
                <Typography variant="h5" fontWeight="bold" color={textColour} style={{ marginBottom: "20px" }}>
                    {project.NAME}
                </Typography>
                <Typography variant="body1" style={{ lineHeight: "30px", marginBottom: "50px" }} color={textColour}>
                    {project.DESCRIPTION}
                </Typography>
                <Typography color={textColour}>
                <a href={project.LINK} className="LinkClass" target="_blank" rel="noreferrer" style={linkStyles}>
                    VIEW PROJECT
                </a>
                </Typography>
                <div className="ProjectImage--Div">
                    {project?.IMAGES?.map(src => (
                        <div className="ProjectImage--Container">
                            <img src={src} className="ProjectImage" />
                        </div>
                    ))}
                </div>
            </div>
        </Dialog>
        
        <div className="Page-Background">
            <Navbar />
            <div className="Content--Container">
                <div className="ProjectCards--Div container">
                {
                    PROJECTS.map((project, index) => (
                        <ProjectCard
                            key={`${project.NAME}_${index}`}
                            name={project.NAME}
                            description={project.DESCRIPTION}
                            link={project.LINK}
                            images={project.IMAGES}
                            colour={colour}
                            setOpen={setOpen}
                            setProject={setProject}
                        />
                    ))
                }
                </div>
            </div>
        </div>
        </>
    )
}

export default Projects;