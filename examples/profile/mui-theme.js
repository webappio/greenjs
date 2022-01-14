import { createTheme } from "@mui/material/styles";


const theme = createTheme({
    typography: {
        h1: {
            '@media (max-width:600px)': {
                fontSize: "35px",
            }
        },
        h2: {
            '@media (max-width:600px)': {
                fontSize: "30px",
            }
        },
        h3: {
            '@media (max-width:600px)': {
                fontSize: "25px",
            }
        },
        h4: {
            '@media (max-width:600px)': {
                fontSize: "22px",
            }
        },
        h5: {
            '@media (max-width:600px)': {
                fontSize: "20px",
            }
        },
        h6: {
            '@media (max-width:600px)': {
                fontSize: "18px",
            }
        },
    }
})

export {
    theme,
}