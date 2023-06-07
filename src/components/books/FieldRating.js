import React, { useEffect, useState } from "react";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import Swal from "sweetalert2";
import { fetchConToken } from "../../hooks/axios";

const labels = {};
let valor = 0.1;
while (valor <= 5) {
  labels[valor.toFixed(1)] = parseFloat(valor.toFixed(1));
  valor += 0.1;
}

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const HoverRating = (props) => {
  const {
    rating,
    book_id
  } = props;

  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const [isUserRating, setIsUserRating] = useState(false);
  const [ratingActually, setRatingActually] = useState(null);

  const onChange = async (event, newValue) => {
    setValue(newValue);

    if (isUserRating) {
      const res = fetchConToken(`book_rating/${ratingActually.id}`, {
        rating: newValue,
      }, "PATCH")
      res.then(response => {

        Swal.fire(
          "Rating change",
          "",
          "success"
        );
      })
        .catch(error => {
          Swal.fire("Error", "Network", "error");
        });
    } else {
      const res = fetchConToken(`book_rating`, {
        rating: newValue,
        'book_id': book_id,
      }, "POST")
      res.then(response => {

        setIsUserRating(true);
        setRatingActually(response.data.book_rating);
        Swal.fire(
          "Rating change",
          "",
          "success"
        );
      }).catch(error => {
          Swal.fire("Error", "Network", "error");
        });
    }

  }

  const onChangeActive = async (event, newHover) => {
    setHover(newHover);
  }

  useEffect(() => {
    if (rating !== null) {
      setValue(parseFloat(rating.rating));
      setIsUserRating(true);
      setRatingActually(rating)
    } else {
      setValue(0);
      setIsUserRating(false);
    }
  }, [rating]);


  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.1}
        getLabelText={getLabelText}
        onChange={onChange}
        onChangeActive={onChangeActive}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}

export default HoverRating;