const movieModel = require('./movie-model');

const findAllMovies = () =>
  movieModel.find();

const findMovieById = (movieId) =>
  movieModel.findById(movieId);

const createMovie = (movie) =>
  movieModel.create(movie);

const updateMovie = (movie) =>
  movieModel.updateOne({_id: movie._id}, {
    $set: movie
  });

const incrementMovie = (movie, inc) =>
    movieModel.findOneAndUpdate(
        {_id: movie._id},
        {$inc: { likes : inc}, $set: {title: movie.title}},
        {upsert: true, new: true, setDefaultsOnInsert: true}
    );

const deleteMovie = (userId) =>
  movieModel.deleteOne({_id: userId});

module.exports = {
  findAllMovies, findMovieById,
  createMovie, updateMovie, incrementMovie, deleteMovie
};
