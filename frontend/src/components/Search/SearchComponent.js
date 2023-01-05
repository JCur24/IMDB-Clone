import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import './search.css';
import {findBySearch} from "../../services/omdbService";
import {useDispatch, useSelector} from "react-redux";
import {userProfile} from "../../services/userService";
import {getLikedInteractionsByUser} from "../../services/interactionService";
import SearchResult from "./SearchResult";

const selectUser = (state) => state.user;

const SearchComponent = () => {
  const initialUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const [user, setUser] = useState(initialUser);
  const getProfile = () => userProfile(setUser, dispatch).catch(e => setUser(null));

  const [onlyLiked, setOnlyLiked] = useState(false);

  const[interactions, setInteractions] = useState({});
  const getInteractions = () => {
    if(user && user._id) {
      getLikedInteractionsByUser(user._id, setInteractions)
    }
  }

  const params = useParams();
  const navigate = useNavigate();
  const movieTitle = params.searchTerm || '';
  const [searchTerm, setSearchTerm] = useState(movieTitle);
  const [movies, setMovies] = useState({});
  const findMovies = () => {
    navigate(`/search/${searchTerm}`);
    findBySearch(searchTerm, setMovies);
  }

  useEffect(getProfile, []);
  useEffect(findMovies, []);
  useEffect(getInteractions, [user])
  return (
      <>
        <div className = "row mb-1 align-items-center">
          <h1>Search</h1>
          <div className = "col">
            <form onSubmit={findMovies}>
              <i className="fa fa-search position-absolute ps-3 pt-2" id = "wd-search-icon"/>
              <input type = "text"
                     className = "form-control ps-5" id = "wd-search"
                     placeholder="Search OMDb" value={searchTerm}
                     onChange={(s) => setSearchTerm(s.target.value)}
              />
            </form>
          </div>
          <div className={"col-2"}>
            <button onClick={findMovies} className={"btn btn-primary rounded-pill"}>Search</button>
          </div>
        </div>

        {
          user && user.role === "REG" && movies &&
            <label>
              <input name="liked-movies" type="checkbox"
                     className={"ms-3 form-check-input"}
                     onChange={(event) => setOnlyLiked(!onlyLiked)}/>  Only Show Liked Movies
            </label>
        }
        <br/>

        <ul className="list-group mt-3">
          {(movies && movies.length > 0) ?
              (
                onlyLiked ? movies.filter(movie => interactions.find(ix => ix.movieId === movie.imdbID)).map(movie =>
                        <SearchResult data = {{movie: movie, interactions: interactions}}/>) :
                    (movies.map(movie =>
                        <SearchResult data = {{movie: movie, interactions: interactions}}/>))
            ) :
              <p className={"ms-3 lead"}>Enter a search term to see results.</p>
          }
        </ul>
      </>
  )
}

export default SearchComponent;