import React, { Fragment, useState, useEffect } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { currentuser, login, addtask, currentfail,  } from "../actions/current";
import { deletetasks, loadtask, iscompleted } from "../actions/task";
import { loadUser } from "../actions/user";
import Spinner from "./Spinner";
import { setAlert } from "../actions/alert";
function Alltask({
  user,
  task,
  task: { isadmin },
  iscompleted,
  addtask,
  loadtask,
  deletetasks,
  setAlert,
  currentfail,
  auth: { iscurrent },
}) {
  useEffect(async () => {
    await loadtask(user.user._id);
  }, []);

  const Month = new Date().getMonth();
  const dates = new Date().getDate();
  var [users, setUsers] = useState("");

  const [formData, setFormData] = useState({
    tasks: "",
    date: {
      year: "2021",
      month: `${Month}`,
      day: `${dates}`,
    },
  });
  var userss = null;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const { tasks, date } = formData;

  const onClick = async () => {
    await addtask(user.user._id, { tasks, date });
    loadtask(user.user._id);
  };
  const deletert = async (task) => {
    await deletetasks(user.user._id, task._id);
    loadtask(user.user._id);
    setAlert("task have been deleted", "danger");
  };
  const complerter = async (task) => {
    await iscompleted(user.user._id, task._id);
    loadtask(user.user._id);
  };
    if (!iscurrent) {
      return <Redirect to="/admin" />;
    }

  return (
    <Fragment>
      {task.tasks === null ? (
        <div class="container">
          <Spinner />
        </div>
      ) : (
        <Fragment>
          {
            ((userss = task.tasks.filter(
              (task) =>
                task.date.day === `${dates}` && task.date.month === `${Month}`
            )),
            console.log(userss))
          }
          <section class="task-container">
            <div class="tasks-input">
              <input
                className="input-task"
                type="text"
                name="tasks"
                placeholder="Add tasks"
                onChange={onChange}
                required
              ></input>
              <span class="" onClick={() => onClick()}>
                <i class="fas fa-plus-circle white"></i>
              </span>
            </div>
            {userss.map((taske) => (
              <div class="tasks-input ">
                <p
                  class={`white ${
                    taske.iscompleted ? `completer` : ""
                  } taskname`}
                >
                  {taske.tasks}
                </p>
                {console.log(taske.iscompleted)}
                <span class="btn">
                  <i
                    class={`fas fa-check-circle green ${
                      isadmin ? "" : `inactive`
                    } `}
                    onClick={() => complerter(taske)}
                  ></i>
                  &nbsp;&nbsp;&nbsp;
                  <i
                    class="fas fa-times-circle red"
                    onClick={() => deletert(taske)}
                  ></i>
                </span>
              </div>
            ))}
          </section>
          <span class={`container ${isadmin ? "" : `inactive`} `}>
            <i
              class={`fas fa-sign-out-alt white`}
              onClick={() => currentfail()}
            >
              &nbsp; Home
            </i>
            &nbsp;&nbsp;
          </span>
        </Fragment>
      )}
    </Fragment>
  );
}

Alltask.propTypes = {
  addtask: PropTypes.func.isRequired,
  loadtask: PropTypes.node.isRequired,
  task: PropTypes.object.isRequired,
  deletetasks: PropTypes.func.isRequired,
  currentfail: PropTypes.func.isRequired,
  iscompleted: PropTypes.func.isRequired,
  setAlert:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  task: state.task,
  auth: state.auth,
  
});

export default connect(mapStateToProps, {
  addtask,
  loadtask,
  deletetasks,
  iscompleted,
  setAlert,
  currentfail
})(Alltask);
