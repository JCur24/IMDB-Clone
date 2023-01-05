const interactionDao = require('./interaction-dao');

module.exports = (app) => {

  const findAllInteractions = (req, res) =>
    interactionDao.findAllInteractions()
      .then(interactions => res.json(interactions));

  const findInteractionById = (req, res) =>
    interactionDao.findInteractionById(req.params.interactionId)
      .then(interaction => res.json(interaction));

  const findByMovie = (req, res) =>
      interactionDao.findByMovie(req.params.movieId)
          .then(interaction => res.json(interaction));

  const findByUser = (req, res) => {
    interactionDao.findByUser(req.params.userId)
    .then(interaction => res.json(interaction));
  }

  const findByUserMovie = (req, res) =>
      interactionDao.findByUserMovie(req.params.movieId, req.params.userId)
          .then(interaction => res.json(interaction));

  const deleteInteraction = (req, res) =>
    interactionDao.deleteInteraction(req.params.interactionId)
      .then(status => res.send(status));

  const updateInteraction = (req, res) =>
    interactionDao.updateInteraction(req.body)
      .then(status => req.send(status));

  const updateOrCreateInteraction = (req, res) => {
    interactionDao.updateOrCreate(req.body)
    .then(interact => res.json(interact));
  }

  const like = (req, res) => {
    interactionDao.findByUserMovie(req.body)
      .then(interaction => {
        if(interaction) {
          req.body.liked = req.body.liked !== true;
        }
        interactionDao.createInteraction(req.body)
          .then(user => {
            res.json(user)
          });
      })
  }

  const comment = (req, res) => {
    interactionDao.findByUserMovie(req.body)
        .then(interaction => {
          if(interaction) {

          }
          interactionDao.createInteraction(req.body)
              .then(user => {
                res.json(user)
              });
        })
  }

  app.put('/api/interactions/interact', updateOrCreateInteraction);
  app.put('/api/interactions', updateInteraction);
  app.delete('/api/interactions/:interactionId', deleteInteraction);
  app.get('/api/interactions', findAllInteractions);
  app.get('/api/interactions/:interactionId', findInteractionById);
  app.get('/api/movie/:movieId', findByMovie);
  app.get('/api/user/:userId', findByUser);
  app.get('/api/interact/:movieId/:userId', findByUserMovie);
};