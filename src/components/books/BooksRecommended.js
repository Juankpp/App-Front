import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import {  Container } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { finishLoading, startLoading } from "../../actions/ui";

import { fetchConToken } from "../../hooks/axios";
import Swal from "sweetalert2";

import Divider from '@mui/material/Divider';
import { useDispatch } from "react-redux";


const BooksRecommended = (props) => {

    const dispatch = useDispatch();
    const [booksRecommended, setBooksRecommended] = useState([]);
    console.log(booksRecommended.length)
    const handleGetBooksRecommended = async () => {

        const res = fetchConToken(`books/recommended`, {}, "GET")
        res.then(response => {

            if(response.status === 200){
                setBooksRecommended(response.data.books);
            }else{
                setBooksRecommended([])
            }
        })
            .catch(error => {
                Swal.fire("Error", "Network", "error");
            });
    };

    useEffect(() => {
        dispatch(startLoading());
        handleGetBooksRecommended();
        dispatch(finishLoading());
    }, []);

    return (
        <>
            {booksRecommended.length > 0 &&
                <>
                    <Divider textAlign="left">Books Recommendeds</Divider>

                    <Container sx={{ py: 8 }} maxWidth={false}>

                        <Grid container spacing={4}>
                            {booksRecommended.map((book_recommended) => (
                                <Grid item key={book_recommended.id} xs={12} sm={6} md={3} lg={3}>
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
                                                    {book_recommended.title}
                                                </Typography>
                                                <br />
                                                <br />
                                                <Typography variant="body1">Author: {book_recommended.author.name}</Typography>
                                                <Typography variant="body1">Average Rating: {book_recommended.average_rating}</Typography>
                                                <Typography variant="body1">Ratings Count: {book_recommended.ratings_count}</Typography>
                                                <Typography variant="body1">Text Review Count: {book_recommended.text_reviews_count}</Typography>
                                                <Typography variant="body1">Publisher:  {book_recommended.publisher}</Typography>
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

export default BooksRecommended;