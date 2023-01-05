import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {
  findUsersByAdmin,
  userEditProfile,
  userLogout,
  userProfile
} from "../../services/userService";
import {useDispatch, useSelector} from "react-redux";
import {getInteractionsByUser} from "../../services/interactionService";
import LikedMovies from "./Interactions/LikedMovies";
import ReviewedMovie from "./Interactions/ReviewedMovie";

const selectUser = (state) => state.user;

const MyProfile = () => {
  const initialUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [interactions, setInteractions] = useState({});
  const [adminUsers, setAdminUsers] = useState({});
  const navigate = useNavigate();

  const getProfile = () => {
    userProfile(setUser, dispatch).then((e) => {
      if(user.role === 'REG') {
        getInteractionsByUser(user._id, setInteractions)
      }
      if(user.role === 'ADMIN') {
        findUsersByAdmin(user._id, setAdminUsers)
      }
    })
  };
  const logout = () => userLogout(navigate, dispatch);
  const updateProfile = () => userEditProfile(user, dispatch);
  useEffect(getProfile,[]);

    return (
        <div>
            <h1>Profile: @{user.username}</h1>
            <label htmlFor={"firstname-input"}>First Name:</label>
            <input
                id={'firstname-input'}
                value={user.firstName}
                onChange={(e) => setUser({...user, firstName: e.target.value})}
                placeholder="username"
                className="form-control"
                disabled={!edit}/>
            <label htmlFor={"lastname-input"}>Last Name:</label>
            <input
                id={'lastname-input'}
                value={user.lastName}
                onChange={(e) => setUser({...user, lastName: e.target.value})}
                placeholder="username"
                className="form-control"
                disabled={!edit}/>
            <label for={"username-input"}>Username:</label>
            <input
                id={'username-input'}
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="username"
                className="form-control"
                disabled/>
              <div>
                <label htmlFor={"email-input"}>Email:</label>
                <input
                    id={'email-input'}
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder="Email"
                    className="form-control"
                    disabled={!edit}/>
                <label htmlFor={"role-input"}>User Role:</label>
                <input
                    id={'role-input'}
                    value={user.role}
                    placeholder="User Role"
                    className="form-control"
                    disabled/>

                {
                  user.role === 'REG' &&
                      <div>
                        <label htmlFor={"admin-input"}>Administrator:</label>
                        <Link to={`/profile/${user.adminId}`} className ="list-group-item-action">
                          <input
                          id={'admin-input'}
                          value={user.adminId}
                          placeholder="Administrator"
                          className="form-control"
                          disabled/>
                        </Link>
                      </div>
                }
                {
                  user.role === "ADMIN" && user.group &&
                  <div>
                    <label htmlFor={"group-input"}>Group:</label>
                    <input
                        id={'group-input'}
                        value={user.group}
                        placeholder="Group"
                        className="form-control"
                        disabled/>
                  </div>
                }

              </div>
            {
              edit === false &&
              <button
                  onClick={(e) => setEdit(true)}
                  className="btn btn-primary me-3 mt-2">
                Edit Profile
              </button>
            }
            {
              edit &&
              <button
                  onClick={(e) => {
                    updateProfile()
                    setEdit(false)
                  }}
                  className="btn btn-success me-3 mt-2">
                Save Profile
              </button>
            }
            <button
                onClick={logout}
                className="btn btn-danger mt-2">
              Logout
            </button>
          <hr/>
          {
            interactions.length > 0 && interactions.filter(interact => interact.liked).length > 0 &&
                <LikedMovies interactions = {interactions.filter(interact => interact.liked)}/>

          }
          {
            interactions.length > 0 && interactions.filter(interact => interact.review !== '').length > 0 &&
            <ReviewedMovie interactions = {interactions.filter(interact => interact.review !== '')}/>

          }
          {user.role === "ADMIN" &&
              <div>
                <label htmlFor={"admin-users"}>Administrator Users:</label>
                  <ul className={"list-group"} id={"admin-users"}>
                {
                  adminUsers.length > 0 && adminUsers.map(usr =>
                  <Link to={`/profile/${usr._id}`} className={"list-group-item"}>
                {usr.username}
                  </Link>
                  )
                }
                  </ul>
              </div>
          }

        </div>
    );
};
export default MyProfile;