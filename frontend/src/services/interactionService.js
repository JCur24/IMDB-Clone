const API_HOST = 'http://localhost:4000';
//const API_HOST = 'https://wd-final-heroku.herokuapp.com';
const API_URL = `${API_HOST}/api`;

export const getInteractionsByMovie = (movieId, setInteractions) => {
  fetch(`${API_URL}/movie/${movieId}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json()).then(interactions => setInteractions(interactions));
}

export const getInteractionsByUser = (userId, setInteractions) => {
  fetch(`${API_URL}/user/${userId}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json()).then(interactions => setInteractions(interactions));
}

export const getLikedInteractionsByUser = (userId, setInteractions) => {
  fetch(`${API_URL}/user/${userId}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json()).then(interactions => setInteractions(interactions.filter(i => i.liked)));
}

export const getAllInteractions = (setInteractions) =>
  fetch(`${API_URL}/interactions`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json()).then(interactions => setInteractions(interactions));

export const getInteractionByUserMovie = (movieId, userId, setInteraction) => {
  fetch(`${API_URL}/interact/${movieId}/${userId}`, {
    method: 'GET',
    headers: {
        'content-type': 'application/json'
    }
  }).then(res => res.json()).then(interaction => {
    if(interaction !== null) {
      setInteraction(interaction)
    }
  });
}

export const createOrUpdateInteraction = (interaction, movieId, setInteractions) => {
  fetch(`${API_URL}/interactions/interact`, {
    method: 'PUT',
    body: JSON.stringify(interaction),
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json()).then(i => getInteractionsByMovie(movieId, setInteractions));
}

export const deleteInteraction = (interaction, setInteractions) => {
  fetch(`${API_URL}/interactions/${interaction._id}`, {
    method: 'DELETE'
  }).then(i => getInteractionsByMovie(interaction.movieId, setInteractions))
}
