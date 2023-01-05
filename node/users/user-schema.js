const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  role: {type: String, enum: ['ADMIN', 'REG'], default: 'REG'},
  // regular users
  adminId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  // admin users
  group: String
}, {collection: 'users'});
userSchema.set('timestamps', true);
module.exports = userSchema;