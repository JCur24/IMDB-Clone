const mongoose = require('mongoose');
const movieSchema = mongoose.Schema({
  _id: String,
  title: String,
  likes: {type: Number, default: 1}
}, {collection: 'movies'});
movieSchema.set('timestamps', true);
module.exports = movieSchema;