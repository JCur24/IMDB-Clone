const mongoose = require('mongoose');
const interactionSchema = mongoose.Schema({
  movieId: String,
  userId: String,
  username: String,
  liked: {type:Boolean, default: false},
  review: {type: String, default: ''},
}, {collection: 'interactions'});
interactionSchema.set('timestamps', true);
module.exports = interactionSchema;