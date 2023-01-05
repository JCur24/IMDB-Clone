const interactionModel = require('./interaction-model');

const findAllInteractions = () =>
  interactionModel.find().sort({createdAt: -1});

const findInteractionById = (interactionId) =>
  interactionModel.findById(interactionId);

const findByMovie = (movieId) =>
  interactionModel.find({movieId: movieId});

const findByUser = (userId) =>
  interactionModel.find({userId: userId});

const findByUserMovie = (movieId, userId) =>
    interactionModel.findOne({movieId: movieId, userId: userId});

const createInteraction = (interaction) =>
  interactionModel.create(interaction);

const updateInteraction = (interaction) =>
  interactionModel.updateOne(
      {_id: interaction._id},
      {$set: interaction});

const updateOrCreate = (interaction =>
    interactionModel.findOneAndUpdate(
        {userId: interaction.userId, movieId: interaction.movieId},
        {$set: interaction},
        {upsert: true, new: true, setDefaultsOnInsert: true}
    ));

const deleteInteraction = (interactionId) =>
  interactionModel.deleteOne({_id: interactionId});

module.exports = {
  findAllInteractions, findInteractionById, findByMovie, findByUser, findByUserMovie,
    createInteraction, updateInteraction, deleteInteraction, updateOrCreate
};
