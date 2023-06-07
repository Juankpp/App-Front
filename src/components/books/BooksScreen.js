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
import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import HoverRating from "./FieldRating";
import BooksRecommended from "./BooksRecommended";
import Divider from '@mui/material/Divider';


const theme = createTheme();
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
}));

export const BooksScreen = () => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const classes = useStyles();
    let { page } = useParams();

    const [count, setCounts] = useState(0);

    const handleGetBooks = async () => {
        dispatch(startLoading());
        setLoading(true);
        const res = fetchConToken(`books/${page}`, {}, "GET")
        res.then(response => {
            setCounts(response.data.total);
            setBooks(response.data.books);
            setLoading(false);
            dispatch(finishLoading());
        })
            .catch(error => {
                setLoading(false);
                dispatch(finishLoading());
                Swal.fire("Error", "Network", "error");
            });
    };

    const review_text = async (id) => {

        const res = fetchConToken(`book/${id}`, {
            text_review: id,
        }, "PATCH")
        res.then(response => {
            const new_books = books.map(book => {
                if (book.id == response.data.book.id) {
                    return response.data.book;
                }
                return book;
            })
            setBooks(new_books);
            Swal.fire(
                "Text Review Change",
                "",
                "success"
            );
        })
            .catch(error => {
                Swal.fire("Error", "Network", "error");
            });
    }

    useEffect(() => {
        handleGetBooks();
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
                Books
            </Typography>

            <ThemeProvider theme={theme}>
                <CssBaseline />

                <main>
                    <BooksRecommended/>
                </main>

                <Divider>Books</Divider>

                {loading ? (
                    <div className={classes.root}>
                        <LinearProgress />
                    </div>
                ) : (
                    <main>
                        {books.length < 1 && (
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
                                {books.map((book) => (
                                    <Grid item key={book.id} xs={12} sm={6} md={3} lg={3}>
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
                                                    {book.title}
                                                </Typography>
                                                <br />
                                                <br />
                                                <Typography variant="body1">Author: {book.author.name}</Typography>
                                                <Typography variant="body1">Average Rating: {book.average_rating}</Typography>
                                                <Typography variant="body1">Ratings Count: {book.ratings_count}</Typography>
                                                <Typography variant="body1">Text Review Count: {book.text_reviews_count}</Typography>
                                                <Typography variant="body1">Publisher:  {book.publisher}</Typography>

                                            </CardContent>
                                            <CardActions>
                                                <HoverRating book_id={book.id} rating={book.ratings.length > 0 ? book.ratings[0] : null} />

                                                <Button size="small" onClick={() => review_text(book.id)} color="primary">
                                                    Text Review
                                                </Button>
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
                                                    to={`/books/${item.page}`}
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
