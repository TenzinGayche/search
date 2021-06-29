import React, { Fragment, useState, useEffect } from "react";
import { Link,Redirect } from "react-router-dom";
import axios from "axios";
import store from "../store";

import { loadUser, isCurrent } from "../actions/user";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Spinner from "./Spinner";
import { currentuser } from "../actions/current";

function Home({ auth,auth:{iscurrent},task:{isadmin} ,loadUser, currentuser, isCurrent }) {
  useEffect(() => {
    loadUser();
  }, []);

  if(isadmin){
    return <Redirect to="/admin" />;
  }
  if (iscurrent) {
    return <Redirect to="/login" />;
  }
    const onClick = (user) => {
      currentuser(user);
      isCurrent();
    };
 


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
Home.propTypes = {
  loadUser: PropTypes.func.isRequired,
  currentuser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  task: state.task
});
export default connect(mapStateToProps, { loadUser, currentuser, isCurrent })(
  Home
);
