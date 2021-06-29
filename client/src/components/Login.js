import React, { Fragment, useState, useEffect } from "react";
import { loadUser, isCurrent } from "../actions/user";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { currentfail, currentuser, login } from "../actions/current";
import Spinner from "./Spinner";
import { isadmins } from "../actions/task";
import { setAlert } from "../actions/alert";

function Login({
  auth,
  users,
  currentuser,
  currentfail,
  login,
  isadmins,
  setAlert,
}) {
  const [formData, setFormData] = useState({
    user: users.user.user,
    password: "",
  });
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { user, password } = formData;
  const onClick = async () => {
    await login({ user, password });
   

    console.log(users);
  };
  if (
    (users.user.user === "Amala" && users.isAuthenticated === true) ||
    (users.user.user === "Pala" && users.isAuthenticated === true)
  ) {
    console.log("hiii");
    isadmins();
    currentfail();

    return <Redirect to="/admin" />;
  }

  if (users.isAuthenticated) {
     
    return <Redirect to="/profile" />;
  }

  return (
    <Fragment>
      {users.user === false ? (
        <div class="container">
          <Spinner />
        </div>
      ) : (
        <Fragment>
          <section className="login-container">
            <div className="users-box">
              <img
                src={require(`./img/${users.user.user}.jpeg`).default}
                alt=""
              ></img>

              <h1 className="name">{users.user.user}</h1>
            </div>
            <div className="password">
              <input
                className="inputs"
                name="password"
                type="password"
                value={password}
                placeholder="Password"
                onChange={onChange}
              ></input>

              <div>
                <i
                  class="fas fa-sign-in-alt white"
                  onClick={() => onClick()}
                ></i>
              </div>
              <Link to="/" class="white container">
                Home
              </Link>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
}
Login.propTypes = {
  currentuser: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  currentfail: PropTypes.func.isRequired,
  isadmins: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.user,
  users: state.user,
});

export default connect(mapStateToProps, {
  currentuser,
  login,
  currentfail,
  isadmins,
  setAlert,
})(Login);
