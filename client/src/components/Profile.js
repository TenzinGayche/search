import React, { Fragment,useEffect } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { currentfail, logout,} from "../actions/current";
import { loadtask, notadmins } from "../actions/task";
import { setAlert } from "../actions/alert";


function Profile({
  user,
  task: { isadmin },
  user: { iscurrent },
  logout,
  currentfail,
  notadmins,
  setAlert,
  loadtask,
}) {
    useEffect(() => {
      setAlert(`Welcome ${user.user.user}`, "green");
    }, []);
  const onClick = async () => {
    await logout();
    await currentfail();
    await loadtask(12345)
    await setAlert(isadmin?`Back to Users`:`User is now logged out,Press Habito button on the top`,"green")
  };
  const Loadtasks=async()=>{
    await loadtask(user.user._id)
  }
   if (!user.isAuthenticated) {
     return <Redirect to="/" />;
   }

  return (
    <section class="container">
      <div class="profile">
        <Link to="/alltasks">
          {" "}
          <div class="tasks-box white">
            <i class="fas fa-table"></i>
            <h1>Task</h1>
          </div>
        </Link>

        <Link to="/progress">
          <div class="tasks-box" onClick={() => Loadtasks()}>
            <i class="fas fa-chart-line white"></i>

            <h1 class="white">All tasks</h1>
          </div>
        </Link>
        <div class="tasks-box " onClick={() => onClick()}>
          <i class="fas fa-sign-out-alt"></i>

          <h1 class="white"> {isadmin ? "Back" : `Logout`}</h1>
        </div>
        <div
          class={`tasks-box  ${isadmin ? "" : `inactive`}`}
          onClick={() => notadmins()}
        >
          <i class="fas fa-sign-out-alt"></i>

          <h1 class="white">Logout</h1>
        </div>
      </div>
    </section>
  );
};
 

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  currentfail: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  loadtask: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  task:state.task

});

export default connect(mapStateToProps, {
  logout,
  currentfail,
  notadmins,
  setAlert,
  loadtask
})(Profile);
