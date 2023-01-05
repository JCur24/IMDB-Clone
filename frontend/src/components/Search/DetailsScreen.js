import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import NavigationSidebar from "../NavigationSidebar";
import {findByImdbId} from "../../services/omdbService";
import {useSelector, useDispatch} from "react-redux";
import {
    getInteractionsByMovie,
    createOrUpdateInteraction,
    getInteractionByUserMovie
} from "../../services/interactionService";
import {movieLike, movieUnlike, movieGetLikes} from "../../services/movieService";
import {userProfile} from "../../services/userService";
import CommentList from "./CommentList";

const selectUser = (state) => state.user;

const DetailsScreen = () => {
    const initialUser = useSelector(selectUser);
    const dispatch = useDispatch();
    const params = useParams();
    const movieId = params.id;
    const [movieDetails, setMovieDetails] = useState({Actors: '', Writer: '', Language: '', Rated: '', Ratings: []});
    const findMovieDetailsByImdbID = () => {
        findByImdbId(movieId, setMovieDetails);
    }
    const [user, setUser] = useState(initialUser);
    const getProfile = () => userProfile(setUser, dispatch).catch(e => setUser(null));
    const [movie, setMovie] = useState({_id: movieId, title: movieDetails.Title, likes: -1});
    const [interactions, setInteractions] = useState([]);
    const [interaction, setInteraction] = useState({liked: false});
    const [comment, setComment] = useState('');

    const getInteraction = () => {
        if (user && user._id) {
            getInteractionByUserMovie(params.id, user._id, setInteraction);
        }
    }
    const getInteractions = () => {
        getInteractionsByMovie(params.id, setInteractions);
    }
    const updateInteraction = () => {
        createOrUpdateInteraction({userId: user._id, username: user.username, movieId: movie._id, review: comment},
            movie._id, setInteractions)
    }
    const updateInteractionLike = (bool) => {
        createOrUpdateInteraction({userId: user._id, username: user.username, movieId: movie._id, liked: bool},
            movie._id, setInteractions)
    }
    const getLikesMovie = () => {
        movieGetLikes(movie, setMovie)
    }

    const likeMovie = () => {
        movieLike({_id: movieId, title: movieDetails.Title}, setMovie);
    }
    const unlikeMovie = () => {
        movieUnlike({_id: movieId, title: movieDetails.Title}, setMovie);
    }
    const incrementMovie = () => {
        if(user && user.role === "REG") {
            if (interaction.liked === false) {
                updateInteractionLike(true);
                likeMovie();
            } else {
                updateInteractionLike(false);
                unlikeMovie();

            }
        }
    }

    useEffect(findMovieDetailsByImdbID, [params.id]);
    useEffect(getProfile, []);
    useEffect(getInteractions, []);
    useEffect(getInteraction, [interactions]);
    useEffect(getLikesMovie, []);

    return (
        <div className="row mt-2">
            <div className="col-2 col-md-2 col-lg-1 col-xl-2">
                <NavigationSidebar active="search"/>
            </div>
            <div className="col-10 col-md-10 col-lg-7 col-xl-6"
                 style={{"position": "relative"}}>
                <h1>Details: {movieDetails.Title}</h1>
                <h2>{movieDetails.Year}</h2>
                <div className="row mt-2">
                    <div className="col-8 col-md-6 col-lg-5 col-xl-4">
                        <img src={movieDetails.Poster}
                             alt={`Poster for ${movieDetails.Title}`}
                             height={300} width={200}/>
                    </div>
                    <div className="col-4 col-md-6 col-lg-7 col-xl-8">
                        <b> Directed by:</b> {movieDetails.Director}
                        <br/>
                        <b> Written By: </b>
                        {
                            movieDetails.Writer.split(',').map(writer =>
                                <span> {writer} • </span>
                            )
                        }
                        <br/>
                        <b> Languages: </b>
                        {
                            movieDetails.Language.split(',').map(language =>
                                <span> {language} • </span>
                            )
                        }
                        <br/>
                        <b> Rated: </b>
                        {
                            movieDetails.Rated
                        }
                        <hr/>
                        <h3> Plot </h3>
                        <p>{movieDetails.Plot}</p>
                        <hr/>
                        <h3>Cast</h3>
                        <ul>
                            {
                                movieDetails.Actors.split(',').map(actor =>
                                    <li key={actor}>{actor}</li>
                                )
                            }
                        </ul>
                    </div>
                </div>
                {
                    user === null &&
                    <p className={"mt-3 lead"}>Want to like or review this movie? <Link to="/login">Log in.</Link></p>
                }
                {

                }
                {
                    movie
                    && interaction
                    && <span>
                    <span onClick={incrementMovie}>
                        <i className="fas fa-heart fa-lg" style={{color: interaction.liked ? "#b58900" : "white"}}/>
                    </span>
                        {
                            movie && (movie.likes >=0) && <b> | {movie.likes}</b>
                        }
                        {
                            movie && (movie.likes < 0) && <b> | 0 </b>
                        }
                    </span>
                }
                <hr/>
                {
                    interactions && (interactions.length > 0) &&
                    <CommentList data={{interactions: interactions, setInteractions: setInteractions}}/>
                }
                <br/>{
                user &&
                user.role === "REG"
                &&
                <div className={"row"}>
                    <div className={"col-10"}>
                        <textarea value={comment}
                                  onChange={(event) => setComment(event.target.value)}
                                  className="form-control bg-black text-white"
                                  placeholder="What's happening?"/>
                    </div>
                    <div className = "col-2 mt-2">
                        <button onClick={updateInteraction} className="btn btn-primary fa-pull-right rounded-pill">
                            Comment
                        </button>
                    </div>
                </div>
            }
            </div>
        </div>)
}

export default DetailsScreen;