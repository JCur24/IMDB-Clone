import React, {useEffect, useState} from "react";
import {findUsersByAdmin, userById} from "../../services/userService";
import {getInteractionsByUser} from "../../services/interactionService";
import LikedMovies from "./Interactions/LikedMovies";
import ReviewedMovie from "./Interactions/ReviewedMovie";
import {Link} from "react-router-dom";


const OtherProfile = (data) => {
  const profileId = data.profileId;
  const [profile, setProfile] = useState({});
  const [interactions, setInteractions] = useState({});
  const [adminUsers, setAdminUsers] = useState({});
  const getProfile = () => {
    userById(profileId, setProfile)
  };
  const getInteractions = () => getInteractionsByUser(profileId, setInteractions);
  const getAdminUsers = () => findUsersByAdmin(profileId, setAdminUsers)
  useEffect(getProfile,[profileId]);
  useEffect(getInteractions, []);
  useEffect(getAdminUsers, []);
    return (
        <div>
            <h1>Profile: @{profile.username}</h1>
                  <div>
                    <label htmlFor={"firstname-input"}>First Name:</label>
                    <input
                    id={'firstname-input'}
                    value={profile.firstName}
                    placeholder="username"
                    className="form-control"
                    disabled/>
                    <label htmlFor={"lastname-input"}>Last Name:</label>
                    <input
                    id={'lastname-input'}
                    value={profile.lastName}
                    placeholder="username"
                    className="form-control"
                    disabled/>
                    <label htmlFor={"username-input"}>Username:</label>
                    <input
                    id={'username-input'}
                    value={profile.username}
                    placeholder="username"
                    className="form-control"
                    disabled/>
                    <label htmlFor={"role-input"}>User Role:</label>
                    <input
                        id={"role-input"}
                        value={profile.role}
                        placeholder="Role"
                        className="form-control"
                        disabled/>
                  </div>
          {
            profile && profile.role === 'ADMIN' && profile.group &&
                <div>
                  <label htmlFor={"group-input"}>Admin Group:</label>
            <input
                id={"group-input"}
                value={profile.group}
                placeholder="Group"
                className="form-control"
                disabled/>
                </div>
          }
          <hr/>
          {
            profile && profile.role === 'REG' && interactions.length > 0 && interactions.filter(interact => interact.liked).length > 0 &&
            <LikedMovies interactions = {interactions.filter(interact => interact.liked)}/>

          }
          {
            profile && profile.role === 'REG' && interactions.length > 0 && interactions.filter(interact => interact.review !== '').length > 0 &&
            <ReviewedMovie interactions = {interactions.filter(interact => interact.review !== '')}/>
          }
          {profile && profile.role === "ADMIN" &&
          <div>
            <label htmlFor={"admin-users"}>Administrator Users:</label>
            <ul className={"list-group mt-2"} id={"admin-users"}>
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
export default OtherProfile;