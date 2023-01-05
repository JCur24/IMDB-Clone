import React from "react";
import LikedMovie from "./LikedMovie";

const LikedMovies = (data) => {
  const interactions = data.interactions;

  return (
      <div className={"mt-2"}>
        <label htmlFor={"liked-movies"}>Liked Movies:</label>
        <ul className="list-group mt-2" id="liked-movies">
          {
            interactions.map(i => <LikedMovie movieId={i.movieId}/>)
          }
        </ul>
      </div>
  )
}

export default LikedMovies;