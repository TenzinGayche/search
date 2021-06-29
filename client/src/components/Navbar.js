import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { LOGOUT } from "../actions/types";
import { currentfail } from "../actions/current";

function Navbar({ user, user: { isAuthenticated }, currentfail,task :{isadmin}}) {
  return (
    <Fragment>
      {isAuthenticated === true ? (
        <nav class="navbar">
          <h1 class="large">
            <Link to="/">
              <i class="fas fa-fire-alt" onClick={() => currentfail()}></i>{" "}
              Habito
            </Link>
          </h1>
          <ul class="navbar-list">
            <li class="navbar-items">
              <Link to="/profile">
                <img
                  src={
                    require( `./img/${user.user.user}.jpeg`
                     ).default
                  }
                  alt=""
                />
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <Fragment>
          <nav class="navbar">
            <h1 class="large">
              <Link to="/">
                <i class="fas fa-fire-alt" onClick={() => currentfail}></i>{" "}
                Habito
              </Link>
            </h1>
            <ul class="navbar-list">
              <li class="navbar-items">
                <Link to="/profile ">
                  <i class="far far fa-user"></i>
                </Link>
              </li>
            </ul>
          </nav>
        </Fragment>
      )}
    </Fragment>
  );
}

Navbar.propTypes = {
  currentfail: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  task: state.task,
});

export default connect(mapStateToProps, { currentfail })(Navbar);
