const mongoose = require('mongoose');
const movieSchema = require('./movie-schema');
const movieModel = mongoose
  .model('MovieModel', movieSchema);
module.exports = movieModel;
