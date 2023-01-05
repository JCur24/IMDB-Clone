import React, {useEffect, useState} from "react";
import {movieGetLikes} from "../../../services/movieService";
import {Link} from "react-router-dom";

const LikedMovies = (data) => {
  const movieId = data.movieId;
  const [movie, setMovie] = useState({});
  const getMovieLikes = () => {
    movieGetLikes({_id: movieId}, setMovie);
  }

  useEffect(getMovieLikes, []);

  return (
      <>
        {movie &&
        <Link to={`/details/${movieId}`}
              className={"list-group-item list-group-item-action"}>
          <p><b>{movie.title}:</b> <span className={"text-secondary"}>{movie.likes} likes</span></p>
        </Link>
        }
      </>
  )
}

export default LikedMovies;