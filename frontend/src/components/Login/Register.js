import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import NavigationSidebar from "../NavigationSidebar";
import {findAdminUsers, userRegister} from "../../services/userService";

const Register = () => {
  const [admins, setAdmins] = useState({});
  const [user, setUser] = useState({firstName: '', lastName: '', username: '', password: '', verifyPassword: '', role: 'REG'});
  const navigate = useNavigate();
  const register = () => {
    if(user.password.length >= 8) {
      if (user.password === user.verifyPassword) {
          userRegister(user, navigate);
      } else {
        document.getElementById(
            "error-msg").innerText = "Error: Password fields do not match.";
      }
    } else {
      document.getElementById(
          "error-msg").innerText = "Error: Password should be at least 8 characters.";
    }
  };
  const getAllAdmins = () => {
    findAdminUsers(setAdmins);
    if(admins.length > 0) {
      setUser({...user, adminId: admins[0]._id});
    }
  }
  useEffect(getAllAdmins, []);
  return(
      <div className="row mt-2">
        <div className="col-2 col-md-2 col-lg-1 col-xl-2">
          <NavigationSidebar active="home"/>
        </div>
        <div className="col-10 col-md-10 col-lg-7 col-xl-6"
             style={{"position": "relative"}}>
          <h1>Register</h1>
          <input
              value={user.firstName}
              onChange={(e) => setUser({...user, firstName: e.target.value})}
              placeholder="First Name"
              className="form-control"/>
          <input
              value={user.lastName}
              onChange={(e) => setUser({...user, lastName: e.target.value})}
              placeholder="Last Name"
              className="form-control"/>
          <input
              value={user.email}
              onChange={(e) => setUser({...user, email: e.target.value})}
              placeholder="Email"
              type="email"
              className="form-control"/>
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
          <input
              onChange={(e) => setUser({...user, verifyPassword: e.target.value})}
              placeholder="verify password"
              type="password"
              className="form-control"/>
          <label for={'role-select'} className={"mt-2"}>Select User Role:</label>
          <select name={"role"}
                  id={"role-select"}
                  className={"form-select"}
                  onChange={(e) => setUser({...user, role:e.target.value})}>
            <option value = "REG">
              Regular
            </option>
            <option value = "ADMIN">
              Admin
            </option>
          </select>
          {
            user && user.role === "REG" && admins.length > 0 &&
                <div>
            <label htmlFor={'admin-select'} className={"mt-2"}>Select Administrator:</label>
            <select name={"admin"}
                    id={"admin-select"}
                    onChange={(e) => setUser({...user, adminId:e.target.value})}
                    className={'form-select'}
            >
              {
                admins.map(admin =>
                    <option value = {admin._id}>
                      {admin.username}
                    </option>
                )
              }
            </select>
                </div>
          }
          {
            user && user.role === "ADMIN" &&
                <div>
            <label htmlFor={'group-input'} className={"mt-2"}>Name of Administrator Group:</label>
            <input
                id={"group-input"}
                value={user.group}
                onChange={(e) => setUser({...user, group: e.target.value})}
                placeholder="Group Name"
                className="form-control"/>
                </div>

          }
          <hr/>

          <br/>
          <button
              className="btn btn-primary"
              onClick={register}>
            Register
          </button>
          {
            user && user.password !== user.verifyPassword &&
                <p className={"text-warning"}>Warning: Password fields do not match.</p>
          }
          <p className={"text-warning"} id={"error-msg"}/>
          <p className={"mt-3 lead"}>Already have an account? <Link to="/login">Log in.</Link></p>
        </div>
      </div>
  );
};
export default Register;