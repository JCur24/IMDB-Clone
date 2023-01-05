import React, {useEffect, useState} from "react";
import NavigationSidebar from "../NavigationSidebar";
import {useDispatch, useSelector} from "react-redux";
import {
  findAllUsers,
  findUsersByAdmin,
  userProfile
} from "../../services/userService";
import {getAllInteractions} from "../../services/interactionService";
import HomeReviewMovie from "./HomeReviewMovie";
import HomeUser from "./HomeUser";
import {Link} from "react-router-dom";

const selectUser = (state) => state.user;

const HomeScreen = () => {
  const initialUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const [user, setUser] = useState(initialUser);
  const getProfile = () => userProfile(setUser, dispatch).catch(e => setUser(null));

  const [interactions, setInteractions] = useState(initialUser);
  const getInteractions = () => getAllInteractions(setInteractions);

  const [users, setUsers] = useState({})
  const getUsers = () => findAllUsers(setUsers);

  const [adminUsers, setAdminUsers] = useState({});
  const getAdminUsers = () => {
    if(user && user.role === 'ADMIN') {
      findUsersByAdmin(user._id, setAdminUsers)
    }
  }

  useEffect(getProfile, []);
  useEffect(getInteractions, []);
  useEffect(getUsers, []);
  useEffect(getAdminUsers, [user])

  return (
      <div className="row mt-2">
        <div className="col-2">
          <NavigationSidebar active="home"/>
        </div>
        <div className="col-10"
             style={{"position": "relative"}}>
          <h1><i className="fas fa-film"/> Home: Movie Reviews <i className="fas fa-film"/></h1>
          <div className={"row"}>
          {
            interactions && interactions.length > 0 &&
                <div className={"col-6"}>
                  <label htmlFor={"recent-reviews"}>Recently Reviewed Movies:</label>
                  <ul id={"recent-reviews"} className={"list-group"}>
                    {
                      interactions.filter(i => i.review !== '').slice(0,3).map(ix =>
                          <HomeReviewMovie data = {ix}/>

                      )
                    }
                  </ul>
                </div>
          }
          {
            users && users.length > 0 &&
            <div className={"col-6"}>
              <label htmlFor={"recent-users"}>Recently Joined Users:</label>
              <ul id={"recent-users"} className={"list-group"}>
                {
                  users.slice(0,3).map(ix =>
                      <HomeUser data = {ix}/>

                  )
                }
              </ul>
            </div>
          }
          </div>
          {
            user && user.role=== "REG" && interactions && interactions.length > 0 && interactions.filter(i => i.userId === user._id).length > 0 &&
            <div className={"mt-3 col-6"}>
              <label htmlFor={"recent-reviews-user mt-3"}>Your Recently Reviewed Movies:</label>
              <ul id={"recent-reviews-user"} className={"list-group"}>
                {
                  interactions.filter(i => ((i.review !== '') && (i.userId === user._id))).slice(0,3).map(ix =>
                    <HomeReviewMovie data = {ix}/>
                  )
                }
              </ul>
            </div>
          }
          {user &&  user.role === "ADMIN" &&
          <div className={"col-6"}>
            <label htmlFor={"admin-users"}>Your Users:</label>
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
      </div>
  )
}

export default HomeScreen;