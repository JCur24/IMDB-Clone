import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {findByImdbId} from "../../../services/omdbService";

const MovieReview = (input) => {
  const data = input.data;
  const movieId = data.movieId;
  const [movie, setMovie] = useState({});
  const getMovieLikes = () => {
    findByImdbId(movieId, setMovie);
  }

 useEffect(getMovieLikes, []);

  return (
      <Link to={`/details/${movieId}`}
            className={"list-group-item list-group-item-action"}>
         {movie &&
         <p><b>{movie.Title}:</b> <span className={"text-secondary"}>{data.review}</span></p>}
      </Link>

  )
}

export default MovieReview;