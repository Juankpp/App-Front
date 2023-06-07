import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Box, Container } from "@mui/system";
import Card from "@mui/material/Card";
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
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from "react-redux";


const MoviesRecommended = (props) => {

    const dispatch = useDispatch();
    const [moviesRecommended, setMoviesRecommended] = useState([]);

    const { access_token } = useSelector((state) => state.auth);

    const handleGetMoviesRecommended = async () => {

        const res = fetchConToken(`movies/recommended`, {}, "GET")
        res.then(response => {

            if (response.status === 200) {
                setMoviesRecommended(response.data.movies);
            } else {
                setMoviesRecommended([])
            }
        })
            .catch(error => {
                Swal.fire("Error", "Network", "error");
            });
    };

    useEffect(() => {
            dispatch(startLoading());
            handleGetMoviesRecommended();
            dispatch(finishLoading());
        
    }, []);

    return (
        <>
            {moviesRecommended.length > 0 &&
                <>
                    <Divider textAlign="left">Movies Recommendeds</Divider>

                    <Container sx={{ py: 8 }} maxWidth={false}>

                        <Grid container spacing={4}>
                            {moviesRecommended.map((movie_recommended) => (
                                <Grid item key={movie_recommended.id} xs={12} sm={6} md={3} lg={3}>
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

                                                {movie_recommended.title}

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
                                                        {movie_recommended?.tags.map(x => (
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
                                                        {movie_recommended?.genres.map(x => (
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

                                    </Card>
                                </Grid>
                            ))}

                        </Grid>

                    </Container>
                </>
            }
        </>
    );
}

export default MoviesRecommended;