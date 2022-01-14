import { Typography } from "@mui/material";
import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <div className="Footer--Div">
            <div className="Footer--Links">
                <div style={{ marginRight: "100px" }}>
                    <Typography variant="h5" fontWeight="bold" style={{ marginBottom: "20px" }}>
                        Product
                    </Typography>
                    <Typography variant="h6" fontWeight="normal" style={{ marginBottom: "10px" }}>
                        Feature 1
                    </Typography>
                    <Typography variant="h6" fontWeight="normal" style={{ marginBottom: "10px" }}>
                        Feature 2
                    </Typography>
                </div>
                <div>
                    <Typography variant="h5" fontWeight="bold" style={{ marginBottom: "20px" }}>
                        Contact
                    </Typography>
                    <Typography variant="h6" fontWeight="normal" style={{ marginBottom: "10px" }}>
                        <a href={"mailto:support@yourcompany.com"}>support@yourcompany.com</a>
                    </Typography>
                    <Typography variant="h6" fontWeight="normal">
                        <a href="tel:+1 888-888-8888">+1 888-888-8888</a>
                    </Typography>
                </div>
            </div>
            <div className="Footer--Base">
                <hr />
                <div className="Footer--Base--Links">
                    <div>
                    <Typography variant="h6" fontWeight="normal" style={{ padding: "5px" }}>
                        With love, from Green JS
                    </Typography>
                    </div>
                    <div style={{ display: "flex" }}>
                    <Typography style={{ marginRight: "10px", padding: "5px" }} variant="h6" fontWeight="normal">
                        Privacy Policy
                    </Typography>
                    <Typography style={{ marginLeft: "10px", padding: "5px" }} variant="h6" fontWeight="normal">
                        Security
                    </Typography>
                    </div>
                    <div>
                    <Typography style={{ padding: "5px" }}>
                        YOUR COMPANY INC.
                    </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {
    Footer,
}