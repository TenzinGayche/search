import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { loadUser, isCurrent } from "../actions/user";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "./Spinner";
import { currentfail, currentuser, login } from "../actions/current";
import { isadmins, loadtask, notadmins } from "../actions/task";
import { setAlert } from "../actions/alert";

function Admin({
  auth,
  auth: { iscurrent },
  task: { isadmin },
  setAlert,

  isadmins,
  notadmins,
  loadUser,
  currentuser,
  isCurrent,
  login,
}) {
  useEffect(() => {
    loadUser();
    loadtask();
  }, []);
  const onClick = (user) => {
    currentuser(user);
    isCurrent();
    isadmins();
  };
  const onClicks = (user) => {
    notadmins();
    setAlert("User is now Logged out", "green");
  };
  if (!isadmin) {
    return <Redirect to="/" />;
  }
  if (iscurrent) {
    return <Redirect to="/alltasks" />;
  }

  return (
    <Fragment>
      {auth.user === null ? (
        <div class="container">
          <Spinner />
        </div>
      ) : (
        <Fragment>
          <div className="Admin">
            <h3 class="white">Admin</h3>
          </div>
          <div class="container">
            <div class="users">
              {auth.user.map((user) => (
                <div
                  class="users-box"
                  name={user.user}
                  onClick={() => onClick(user)}
                >
                  <img
                    src={require(`./img/${user.user}.jpeg`).default}
                    alt="this"
                  ></img>

                  <h1 class="name">{user.user}</h1>
                </div>
              ))}
            </div>
          </div>
          <div className="center" onClick={() => onClicks()}>
            <i class="fas fa-sign-out-alt white"></i>{" "}
            <h3 className="white">Logout</h3>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
Admin.propTypes = {
  loadUser: PropTypes.func.isRequired,
  currentuser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  currentfail: PropTypes.func.isRequired,
  isadmins: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  notadmins: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  task: state.task,
});
export default connect(mapStateToProps, {
  setAlert,
  loadUser,
  currentuser,
  currentfail,
  isadmins,
  notadmins,
  isCurrent,
  loadtask,
  login,
})(Admin);
