import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../main/NavBar";
import { CardActions, CssBaseline, Grid, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Box, Container } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { finishLoading, startLoading } from "../../actions/ui";
import { fetchConToken } from "../../hooks/axios";
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import HoverRating from "./FieldRating";

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
}));

export const SongsScreen = () => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [songs, setSongs] = useState([]);

    const classes = useStyles();
    let { page } = useParams();

    const [count, setCounts] = useState(0);

    const handleGetSongs = async () => {
        dispatch(startLoading());
        setLoading(true);

        const res = fetchConToken(`songs/${page}`, {}, "GET")
        res.then(response => {
            setCounts(response.data.total);
            setSongs(response.data.songs);
            setLoading(false);
            dispatch(finishLoading());
        })
            .catch(error => {
                setLoading(false);
                dispatch(finishLoading());
                Swal.fire("Error", "Network", "error");
            });
    };

    useEffect(() => {
        handleGetSongs();
    }, []);


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
                Songs
            </Typography>
            <hr></hr>


            <ThemeProvider theme={theme}>
                <CssBaseline />
                {loading ? (
                    <div className={classes.root}>
                        <LinearProgress />
                    </div>
                ) : (
                    <main>
                        {songs.length < 1 && (
                            <Box
                                sx={{
                                    bgcolor: "background.paper",
                                    pt: 8,
                                    pb: 6,
                                }}
                            >
                                <Container maxWidth="sm">
                                    <Typography
                                        variant="h5"
                                        align="center"
                                        color="text.secondary"
                                        paragraph
                                    >
                                        <SentimentVeryDissatisfiedIcon sx={{ fontSize: 40 }} />
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        align="center"
                                        color="text.secondary"
                                        paragraph
                                    >
                                        No records found
                                    </Typography>
                                </Container>
                            </Box>
                        )}

                        <Container sx={{ py: 8 }} maxWidth={false}>
                            <Grid container spacing={4}>
                                {songs.map((song) => (
                                    <Grid item key={song.id} xs={12} sm={6} md={4} lg={3}>
                                        <Card
                                            sx={{
                                                height: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <CardContent sx={{ flexGrow: 1 }}>

                                                <Typography
                                                    fontWeight="bold"
                                                    fontSize={18}
                                                    display="inline"
                                                    variant="body1"
                                                >
                                                    {song.song}
                                                </Typography>
                                                <br />
                                                <br />
                                                <Typography variant="body1">Author: {song.artist.name}</Typography>
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1a-content"
                                                        id="panel1a-header"
                                                    >
                                                        <Typography>Text</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails style={{
                                                        "max-height": "300px",
                                                        "overflowY": "auto"
                                                    }}>
                                                        {song.text}
                                                    </AccordionDetails>
                                                </Accordion>

                                            </CardContent>
                                            <CardActions>
                                                <HoverRating song_id={song.id} rating={song.ratings.length > 0 ? song.ratings[0] : null} />
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                                {count > 0 &&
                                    <Grid item key={"Pagination"} xs={12} sm={12} md={12}>

                                        <Pagination
                                            page={parseInt(page, 10)}
                                            count={parseInt((count / 30) + 1, 10)}
                                            renderItem={(item) => (
                                                <PaginationItem
                                                    component={Link}
                                                    to={`/songs/${item.page}`}
                                                    {...item}
                                                />
                                            )}
                                        />
                                    </Grid>
                                }
                            </Grid>

                        </Container>
                    </main>
                )}
            </ThemeProvider >
        </>
    );
};
