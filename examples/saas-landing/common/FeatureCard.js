import { Link } from "@greenio/router";
import { Typography } from "@mui/material";
import React from "react";
import { PlaceholderImage } from "./placeholder-image";
import "./FeatureCard.css";
import { COLOURS } from "../mui-theme";

const FeatureCard = ({ title, description, link, linkText }) => {
    return (
        <div className="FeatureCard">
            <div className="FeatureCard--Image">
                <PlaceholderImage width="100%" height="250px" text="Feature Image" />
            </div>
            <Typography variant="h5" fontWeight="bold" style={{ color: COLOURS.PRIMARY, marginTop: "20px", marginBottom: "20px"}}>
                {title}
            </Typography>
            <Typography variant="h6" fontWeight="normal" style={{ marginTop: "20px", marginBottom: "20px" }}>
                {description}
            </Typography>
            <div>
                <Link to={link}>
                    <Typography variant="h6" style={{ color: COLOURS.PRIMARY }}>
                    {linkText}
                    </Typography>
                </Link>
            </div>
        </div>
    )
};

export {
    FeatureCard,
}