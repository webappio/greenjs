import { Typography } from "@mui/material";
import React from "react";
import { PlaceholderImage } from "./placeholder-image";
import "./TestimonialCard.css";
import { COLOURS } from "../mui-theme";

const DIV_STYLES = {
    border: `5px solid ${COLOURS.PRIMARY}`,
};

const TestimonialCard = ({ testimonial, firstName, lastName, title, company }) => {
    return (
        <div className="TestimonialCard--Div" style={{ ...DIV_STYLES }}>
            <div className="TestimonialCard--Image">
                <PlaceholderImage width="100px" height="50px" text="Company Logo" />
            </div>
            <div className="TestimonialCard--Quote">
                <Typography variant="h6" fontWeight="normal" style={{ padding: "10px" }}>
                    "{testimonial}"
                </Typography>
            </div>
            <div className="TestimonialCard--Details">
                <PlaceholderImage width="50px" height="50px" style={{ borderRadius: "50%" }} />
                <Typography>
                    {firstName} {lastName}
                </Typography>
                <Typography>
                    {title} @ {company}
                </Typography>
            </div>
        </div>
    )
}

export {
    TestimonialCard,
}