import { createTheme } from "@mui/material";

const COLOURS = {
    PRIMARY: "#7689DE",
    SECONDARY: "#000000",
};

const theme = createTheme({
    palette: {
        primary: {
            main: COLOURS.PRIMARY,
        },
        secondary: {
            main: COLOURS.SECONDARY
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "8px",
                }
            }
        }
    },
    typography: {
        h1: {
            '@media (max-width: 600px)': {
                fontSize: "50px",
            }
        },
        h2: {
            '@media (max-width: 600px)': {
                fontSize: "40px",
            }
        },
        h3: {
            '@media (max-width: 600px)': {
                fontSize: "30px",
            }
        },
        h4: {
            '@media (max-width: 600px)': {
                fontSize: "25px",
            }
        },
        h5: {
            '@media (max-width: 600px)': {
                fontSize: "20px",
            }
        },
        h6: {
            '@media (max-width: 600px)': {
                fontSize: "18px",
            }
        },
    }
});

export {
    theme,
    COLOURS,
}