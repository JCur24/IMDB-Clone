const movieDao = require('./movie-dao');

module.exports = (app) => {
  const findAllMovies = (req, res) =>
      movieDao.findAllMovies()
      .then(users => res.json(users));

  const findMovieById = (req, res) => {
    movieDao.findMovieById(req.params.movieId)
    .then(movie => res.json(movie));
  }

  const deleteMovie = (req, res) =>
      movieDao.deleteMovie(req.params.movieId)
      .then(status => req.send(status));

  const updateMovie = (req, res) =>
      movieDao.updateMovie(req.body)
      .then(status => req.send(status));

  const likeMovie = (req, res) => {
    const newMovie = {
          "likes": 1,
          ...req.body,
    }
    movieDao.incrementMovie(newMovie, 1)
    .then(status => res.json(status));
  }

  const unlikeMovie = (req, res) => {
    movieDao.incrementMovie(req.body, -1)
    .then(status => res.json(status));
  }

  app.post('/api/like', likeMovie);
  app.post('/api/unlike', unlikeMovie);
  app.put('/api/movies', updateMovie);
  app.delete('/api/movies/:movieId', deleteMovie);
  app.get('/api/movies', findAllMovies);
  app.get('/api/movies/:movieId', findMovieById);
};