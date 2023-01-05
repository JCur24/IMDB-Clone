import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import NavigationSidebar from "../NavigationSidebar";
import Login from "./Login";
import {
  userProfile,
  userLogout,
  userEditProfile
} from "../../services/userService";
import {useSelector, useDispatch} from "react-redux";
import {getInteractionsByUser} from "../../services/interactionService";
import MyProfile from "./MyProfile";
import OtherProfile from "./OtherProfile";

const selectUser = (state) => state.user;

const Profile = () => {
  const params = useParams();
  const profileId = params.profileId || '';
  const initialUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();
  const getProfile = () => {
    userProfile(setUser, dispatch, navigate, profileId)
  };
  const logout = () => userLogout(navigate, dispatch);
  const updateProfile = () => userEditProfile(user, dispatch);
  useEffect(getProfile,[]);
  if(user === null && profileId === '') {
    return (
      <Login/>
    )
  }
  else {
    return (
        <div className="row mt-2">
          <div className="col-2 col-md-2 col-lg-1 col-xl-2">
            <NavigationSidebar active="profile"/>
          </div>
          <div className="col-10 col-md-10 col-lg-7 col-xl-6"
               style={{"position": "relative"}}>
            {
              (user && (profileId === user._id || profileId === '')) ?
                  <MyProfile/> :
                  <OtherProfile profileId={profileId}/>
            }
          </div>
        </div>
    );
  }
};
export default Profile;