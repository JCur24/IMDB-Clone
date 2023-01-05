import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import './navigation.css';
import {useDispatch, useSelector} from "react-redux";
import {userProfile} from "../../services/userService";

const selectUser = (state) => state.user;

const Index = ({active = 'explore'}) => {
  const initialUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const [user, setUser] = useState(initialUser);
  const getProfile = () => userProfile(setUser, dispatch).catch(e => setUser(null));

  useEffect(getProfile, []);

  return(
      <>
        <div className="list-group min-auto mt-2">
          {
            user && user.username &&
                <div className={"list-group-item text-secondary"}>
                  Hello, <br/><Link to={"/profile"} className={"text-decoration-none"}>@{user.username}</Link>
                </div>
          }
          <Link to="/" className={`list-group-item list-group-item-action  ${active === 'home' ? 'active' : ''}`}>
            <div className="row">
              <div className="col-1">
                <i className="fas fa-home fa-fw"/>
              </div>
              <div className="d-none d-xl-block d-xxl-block col">Home</div>
            </div>
          </Link>
          <Link to="/search" className={`list-group-item list-group-item-action  ${active === 'search' ? 'active' : ''}`}>
            <div className="row">
              <div className="col-1">
                <i className="fas fa-search fa-fw"/>
              </div>
              <div className="d-none d-xl-block d-xxl-block col">Search</div>
            </div>
          </Link>
          <Link to="/profile" className={`list-group-item list-group-item-action  ${active === 'profile' ? 'active' : ''}`}>
            <div className="row">
              <div className="col-1">
                <i className="fas fa-user fa-fw"/>
              </div>
              <div className="d-none d-xl-block d-xxl-block col">Profile</div>
            </div>
          </Link>
          <Link to="/policy" className={`list-group-item list-group-item-action  ${active === 'policy' ? 'active' : ''}`}>
            <div className="row">
              <div className="col-1">
                <i className="fas fa-scroll fa-fw"/>
              </div>
              <div className="d-none d-xl-block d-xxl-block col">Privacy Policy</div>
            </div>
          </Link>
        </div>
      </>
  )
}
export default Index;