import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import store from "../store";

import { loadUser, isCurrent } from "../actions/user";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Spinner from "./Spinner";
import { currentfail, currentuser } from "../actions/current";
import { isadmins, loadtask } from "../actions/task";


function Admin({ auth,auth:{iscurrent},task:{isadmin}, task,currentfail,isadmins, loadUser, currentuser, isCurrent }) {
  useEffect( () => {
    loadUser()
    loadtask()
  }, []);
  const onClick = (user) => {
    currentuser(user);
    isCurrent();
    isadmins()
  };
   if (!isadmin) {
     return <Redirect to="/" />;
   }
   if (iscurrent) {
     return <Redirect to="/profile" />;
   }

 

  return (
    <Fragment>
      {auth.user === null ? (
        <div class="container">
          <Spinner />
        </div>
      ) : (
        <Fragment>
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
        </Fragment>
      )}
    </Fragment>
  );
}
Admin.propTypes = {
  loadUser: PropTypes.func.isRequired,
  currentuser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  currentfail:PropTypes.func.isRequired,
  isadmins:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  task:state.task,
});
export default connect(mapStateToProps, { loadUser, currentuser,currentfail,isadmins, isCurrent,loadtask })(Admin
);
