import {Link} from "react-router-dom";
import React, {useState} from "react";
import NavigationSidebar from "../NavigationSidebar";
import {userLogin} from "../../services/userService";
import {useDispatch} from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const login = () => {
    userLogin(user, dispatch, setUser)
  }
    return(
        <div className="row mt-2">
          <div className="col-2 col-md-2 col-lg-1 col-xl-2">
            <NavigationSidebar active="profile"/>
          </div>
          <div className="col-10 col-md-10 col-lg-7 col-xl-6"
               style={{"position": "relative"}}>
            <h1>Login</h1>
            <input
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="username"
                className="form-control"/>
            <input
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
                type="password"
                className="form-control"/>
            <button
                className="btn btn-primary"
                onClick={login}>
              Login
            </button>
            <p className={"text-warning"} id={"error-msg"}/>
            <p className={"mt-3 lead"}>Not a registered user? <Link to="/register">Register now.</Link></p>
          </div>
        </div>
    );


};

export default Login;