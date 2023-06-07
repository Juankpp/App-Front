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


const SongRecommended = (props) => {

    const dispatch = useDispatch();
    const [songRecommended, setSongRecommended] = useState([]);

    const { access_token } = useSelector((state) => state.auth);

    const handleGetSongRecommended = async () => {

        const res = fetchConToken(`songs/recommended/content`, {}, "GET")
        res.then(response => {

            if (response.status === 200) {
                setSongRecommended(response.data.song);
            } else {
                setSongRecommended([])
            }
        })
            .catch(error => {
                Swal.fire("Error", "Network", "error");
            });
    };

    useEffect(() => {
        dispatch(startLoading());
        handleGetSongRecommended();
        dispatch(finishLoading());

    }, []);

    return (
        <>
            {songRecommended.length > 0 &&
                <>
                    <Divider textAlign="left">Songs Recommendeds</Divider>

                    <Container sx={{ py: 8 }} maxWidth={false}>

                        <Grid container spacing={4}>
                            {songRecommended.map((song) => (
                                <Grid item key={song.id} xs={12} sm={6} md={3} lg={3}>
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

export default SongRecommended;