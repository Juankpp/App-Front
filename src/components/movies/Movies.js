import React, { useEffect, useState } from "react";
import { CssBaseline, Grid, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Box, Container } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { finishLoading, startLoading } from "../../actions/ui";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { fetchConToken } from "../../hooks/axios";
import Swal from "sweetalert2";
import TagIcon from '@mui/icons-material/Tag';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import { useParams } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from "react-redux";

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

export const Movies = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const classes = useStyles();

    const { access_token } = useSelector((state) => state.auth);

    let { page } = useParams();

    page = page ? page : 1;
    const [count, setCounts] = useState(0);

    const handleGetMovies = async () => {
        const res = fetchConToken(`movies/${page}`, {}, "GET")
        res.then(response => {
            setCounts(response.data.total);
            setMovies(response.data.movies);
        })
            .catch(error => {
                Swal.fire("Error", "Network", "error");
            });
    };

    useEffect(() => {
            dispatch(startLoading());
            setLoading(true);
            handleGetMovies();
            setLoading(false);
            dispatch(finishLoading());
        
    }, []);


    return (
        <>
            {loading ? (
                <div className={classes.root}>
                    <LinearProgress />
                </div>
            ) : (
                <main>

                    <Divider>Movies</Divider>
                    {movies.length < 1 && (
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
                            {movies.map((movie) => (
                                <Grid item key={movie.id} xs={12} sm={6} md={3} lg={3}>
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

                                                {movie.title}

                                            </Typography>

                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <Typography>Tags</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails style={{
                                                    "max-height": "300px",
                                                    "overflowY": "auto"
                                                }}>
                                                    <List>
                                                        {movie?.tags.map(x => (
                                                            <ListItem disablePadding key={x.id}>
                                                                <ListItemIcon>
                                                                    <TagIcon />
                                                                </ListItemIcon>
                                                                <ListItemText primary={x.tag} />
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <Typography>Genres</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails style={{
                                                    "max-height": "300px",
                                                    "overflowY": "auto"
                                                }}>
                                                    <List>
                                                        {movie?.genres.map(x => (
                                                            <ListItem disablePadding key={x.id}>
                                                                <ListItemIcon>
                                                                    <TheaterComedyIcon />
                                                                </ListItemIcon>
                                                                <ListItemText primary={x.genre} />
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </AccordionDetails>
                                            </Accordion>

                                        </CardContent>
                                        <CardActions>
                                            <HoverRating movie_id={movie.id} rating={movie.ratings.length > 0 ? movie.ratings[0] : null} />
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
                                                to={`/movies/${item.page}`}
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
        </>
    );
};

export default Movies;