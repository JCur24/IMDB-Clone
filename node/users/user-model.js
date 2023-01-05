const mongoose = require('mongoose');
const userSchema = require('./user-schema');
const userModel = mongoose
  .model('UserModel', userSchema);
module.exports = userModel;
