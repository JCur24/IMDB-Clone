const API_HOST = 'http://localhost:4000';
//const API_HOST = 'https://wd-final-heroku.herokuapp.com';
const API_URL = `${API_HOST}/api`;

export const findAdminUsers = (setAdmins) => {
  fetch(`${API_URL}/admins`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json()).then(admins => setAdmins(admins));
}

export const findUsersByAdmin = (adminId, setAdminUsers) => {
  fetch(`${API_URL}/admin/${adminId}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json()).then(users => setAdminUsers(users));
}

export const findAllUsers = (setUsers) => {
  fetch(`${API_URL}/users`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json()).then(users => setUsers(users));
}

export const userLogin = (user, dispatch) =>
    fetch(`${API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(status => {
      if(status.status === 403) {
        document.getElementById(
            "error-msg").innerText = "Error: Incorrect username/password. Please try again.";
      }
      else {
        dispatch({
          type: 'set-user',
          user: user
        })
        window.location.assign('/profile');
      }
    })

export const userProfile = (setUser, dispatch) =>
  fetch(`${API_URL}/profile`, {
    method: 'POST',
    credentials: 'include'
  }).then(res => res.json())
  .then(user => {
    dispatch({
      type: 'set-user',
      user: user
    })
    setUser(user);
  });

export const userLogout = (navigate, dispatch) =>
    fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include'
    }).then(res => {
      dispatch({
        type: 'logout'
      })
      navigate('/')
    });

export const userRegister = (user, navigate) =>
  fetch(`${API_URL}/register`, {
    method: 'POST',
    body: JSON.stringify(user),
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    }
  }).then(result => {
    if (result.status === 404) {
      document.getElementById(
          "error-msg").innerText = "Error: User already exists. Please try a different username.";
    } else {
      navigate('/profile');
    }
  });

export const userEditProfile = (user, dispatch) => {
  fetch(`${API_URL}/users`, {
    method: 'PUT',
    body: JSON.stringify(user),
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    }
  }).then(status => {
    dispatch({
      type: 'set-user',
      user: user
    })
  });
}

export const userById = (userId, setProfile) => {
  fetch(`${API_URL}/users/${userId}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json()).then(profile => setProfile(profile));
}