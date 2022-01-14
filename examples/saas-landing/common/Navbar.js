import React, { useState } from "react";
import { Button, Typography, Box, Drawer } from "@mui/material";
import { PlaceholderImage } from "./placeholder-image";
import "./Navbar.css";
import { Menu } from "react-feather";

const flexRowStyle = { 
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
};

const Navbar = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
            >
                <div style={{ width: "240px", padding: "20px" }}>
                    <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
                        <PlaceholderImage height="50px" width="100px" text="YOUR LOGO HERE" />
                    </div>
                    <hr style={{ marginBottom: "30px" }} />
                    <Typography variant="h6" style={{ fontWeight: "600", marginBottom: "10px", }}>
                        Product
                    </Typography>
                    <Typography variant="h6" style={{ fontWeight: "600", marginBottom: "10px", }}>
                        Pricing
                    </Typography>
                </div>
            </Drawer>
            <Box style={{
                ...flexRowStyle,
            }}>
                <Box style={flexRowStyle} className="Navbar-Items">
                    <div style={{ marginRight: "20px" }}>
                        <PlaceholderImage height="50px" width="100px" text="YOUR LOGO HERE" />
                    </div>
                    <Typography variant="h6" style={{ fontWeight: "600", marginRight: "20px" }}>
                        Product
                    </Typography>
                    <Typography variant="h6" style={{ fontWeight: "600" }}>
                        Pricing
                    </Typography>
                </Box>
                <Box style={{ ...flexRowStyle, marginLeft: "20px" }} className="Navbar--Items--Small">
                    <Menu onClick={() => setOpen(true)} />
                </Box>
                <Box
                sx={{
                    width: { xs: "150px", md: "250px" },
                    height: { xs: "50px" }
                }}
                >
                    <Button 
                    fullWidth
                    style={{ height: "100%" }}
                    color="primary" variant="contained" size="large">
                        Book a Demo
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export {
    Navbar,
}