export const findBySearch = (searchTerm, setMovies) =>
  fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=d221e54c`)
  .then(res => res.json()).then(results => setMovies(results.Search));

export const findByImdbId = (id, setMovieDetails) =>
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=d221e54c`)
    .then(res => res.json()).then(movie => setMovieDetails(movie));