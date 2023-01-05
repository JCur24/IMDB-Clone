const API_HOST = 'http://localhost:4000';
//const API_HOST = 'https://wd-final-heroku.herokuapp.com';
const API_URL = `${API_HOST}/api`;

export const movieLike = (movie, setMovie) => {
  fetch(`${API_URL}/like`, {
    method: 'POST',
    body: JSON.stringify(movie),
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json()).then(movie => setMovie(movie));
}

export const movieUnlike = (movie, setMovie) => {
  fetch(`${API_URL}/unlike`, {
    method: 'POST',
    body: JSON.stringify(movie),
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json()).then(movie => setMovie(movie));
}

export const movieGetLikes = (movie, setMovie) => {
  fetch(`${API_URL}/movies/${movie._id}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json())
  .then(movie => {
    if(movie !== null) {
      setMovie(movie)
    }
  })
}