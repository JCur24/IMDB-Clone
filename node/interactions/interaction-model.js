const mongoose = require('mongoose');
const interactionSchema = require('./interaction-schema');
const interactionModel = mongoose
  .model('interactionModel', interactionSchema);
module.exports = interactionModel;
