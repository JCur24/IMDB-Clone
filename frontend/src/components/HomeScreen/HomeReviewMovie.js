import React, {useEffect, useState} from "react";
import {findByImdbId} from "../../services/omdbService";
import {Link} from "react-router-dom";

const HomeReviewMovie = (data) => {
  const interaction = data.data;
  const movieId = interaction.movieId
  const [movie, setMovie] = useState({});

  const findMovieDetailsByImdbID = () => {
    findByImdbId(movieId, setMovie);
  }

  useEffect(findMovieDetailsByImdbID, []);

  return (
      <Link to={`/details/${movieId}`}
            className={"list-group-item list-group-item-action"}>
        {movie &&
            <div className={"row"}>
              <div className={"col-lg-2 col-xl-2 col-md-3 col-sm-3 d-none d-sm-block"}>
                <img src={movie.Poster} alt={`Poster for ${movie.Title}`} height={75}/>
              </div>
              <div className={"col"}>
                <p><b>{movie.Title}:</b> <span className={"text-secondary"}>@{interaction.username}</span></p>
                <p>{interaction.review}</p>
              </div>
            </div>
            }
      </Link>
  )
}

export default HomeReviewMovie;