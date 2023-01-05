import {Link} from "react-router-dom";
import React from "react";

const SearchResult = (data) => {
  const movie = data.data.movie;
  const interactions = data.data.interactions;
  return (
      <Link to={`/details/${movie.imdbID}`} className={"list-group-item list-group-item-action"}>
        <img src={movie.Poster}
             alt={`Poster for ${movie.Title}`}
             height={50}/>
        <span className={"ps-3"}>{movie.Title}</span>
        {
          interactions && interactions.length > 0 && interactions.find(ix => ix.movieId === movie.imdbID) &&
          interactions.find(ix => ix.movieId === movie.imdbID).liked &&
          <i class ="fa fa-heart ms-2"/>
        }
      </Link>
  )
}

export default SearchResult;