const userModel = require('./user-model');

const findAllUsers = () =>
  userModel.find().sort({createdAt: -1});

const findAllAdmins = () =>
    userModel.find({role: "ADMIN"});

const findUsersByAdminId = (adminId) =>
    userModel.find({adminId: adminId})

const findUserById = (userId) =>
  userModel.findById(userId);

const findByUsernameAndPassword = ({username, password}) =>
  userModel.findOne({username, password});

const findByUsername = ({username}) =>
  userModel.findOne({username});

const createUser = (user) =>
  userModel.create(user);

const updateUser = (user) =>
  userModel.updateOne({_id: user._id}, {
    $set: user
  });

const deleteUser = (userId) =>
  userModel.deleteOne({_id: userId});

module.exports = {
  findByUsername, findAllUsers, findUserById,
  findByUsernameAndPassword,
  createUser, updateUser, deleteUser, findAllAdmins, findUsersByAdminId
};
