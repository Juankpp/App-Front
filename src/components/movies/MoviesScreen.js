import React from "react";
import Navbar from "../main/NavBar";
import { CssBaseline, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";

import MoviesRecommended from "./MoviesRecommended";
import Movies from "./Movies";

const theme = createTheme();

export const MoviesScreen = () => {
 

    return (
        <>
            <Navbar />
            <Typography
                component="h1"
                variant="h2"
                sx={{
                    marginTop: 4,
                    marginLeft: 4,
                }}
            >
                Movies
            </Typography>
            <ThemeProvider theme={theme}>

            <CssBaseline />
                <main>
                <MoviesRecommended/>
                </main>
                <Movies/>
            </ThemeProvider >
        </>
    );
};
