import React from "react";
import MovieReview from "./MovieReview";

const ReviewedMovie = (data) => {
  const interactions = data.interactions;

  return (
      <div className={"mt-2"}>
        <label htmlFor={"movie-reviews"}>Movie Reviews:</label>
        <ul className="list-group mt-2" id={"movie-reviews"}>
        {
          interactions.map(i => <MovieReview data={i}/>)
        }
        </ul>
      </div>
  )
}

export default ReviewedMovie;