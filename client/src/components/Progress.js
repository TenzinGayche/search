import React, { Fragment, useState, useEffect } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { currentuser, login, addtask } from "../actions/current";
import { deletetasks, loadtask } from "../actions/task";
import { loadUser } from "../actions/user";
import Spinner from "./Spinner";
function Progress({ user, task, addtask, loadtask, deletetasks }) {
  useEffect(() => {
    loadtask(user.user._id);
  },[]);
  const d = new Date();
  var monther = d.getMonth();
  var dayers = d.getMonth();
  var datet = d.getDate();
  var month = dayers;
  var userss = [];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var [state, setstate] = useState(month);
  const [date, setdate] = useState(datet);
 var completed=1;
  var incompleted=1;
  
 
  
    //   while(j<=i)
    //   {
    // switch (months) {
    //   case "January":
    //     return (dayers = 31);
    //   case "February":
    //     return (dayers = 28);
    //   case "March":
    //     return (dayers = 31);
    //   case "April":
    //     return (dayers = 30);
    //   case "May":
    //     return (dayers = 31);
    //   case "June":
    //     return (dayers= 30);
    //   case "July":
    //     return (dayers = 31);
    //   case "August":
    //     return (dayers = 31);
    //   case "September":
    //     return (dayers = 30);
    //   case "October":
    //     return (dayers = 31);
    //   case "November":
    //     return (dayers = 30);
    //   case "December":
    //     return (dayers = 31);

    // }
    // j++}
    dayers = state;
  if (dayers === 0) {
    dayers = 31;
  }
  if (dayers === 1) {
    dayers = 28;
  }
  if (dayers === 2) {
    dayers = 31;
  }
  if (dayers === 3) {
    dayers = 30;
  }
  if (dayers === 4) {
    dayers = 31;
  }
  if (dayers === 5) {
    dayers = 30;
  }

  if (dayers === 6) {
    dayers = 31;
  }

  if (dayers === 7) {
    dayers = 31;
  }

  if (dayers === 8) {
    dayers = 30;
  }

  if (dayers === 9) {
    dayers = 31;
  }

  if (dayers === 10) {
    dayers = 30;
  }

  if (dayers === 11) {
    dayers = 31;
  }

  var da = 1;
  var days = [];
  while (da <= dayers) {
    days[da] = da;
    da++;
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
                task.date.day === `${date}` && task.date.month === `${state}`
            )),
            console.log(userss))
          }
          <section class="progress-container">
            <div className="calender">
              <ul>
                <li>SUN</li>
                <li>MON</li>
                <li>TUE</li>
                <li>WED</li>
                <li>THUR</li>
                <li>FRI</li>
                <li>SAT</li>
                {days.map((day) => (
                  <li
                    className={`${
                      day === datet && state === monther ? `active` : null
                    }`}
                    onClick={(event) => setdate(event.currentTarget.innerHTML)}
                  >
                    {day}
                  </li>
                ))}
              </ul>
            </div>

            <div class="month">
              <Link href="">
                <i
                  class="fas fa-minus  white"
                  onClick={() => setstate(--state)}
                ></i>
              </Link>
              &nbsp;&nbsp;&nbsp;
              <p class="white">{months[state]}</p>&nbsp;&nbsp;&nbsp;
              <Link href="">
                <i
                  class="fas fa-plus white"
                  onClick={() => setstate(++state)}
                ></i>
              </Link>
            </div>

            <div class="tittle">
              <h1 class="progress progress-tasks-input green">
                Completed task
                <span class="btn">
                  <a href="">
                    <i class="fas fa-check-circle green"></i>
                  </a>
                </span>
              </h1>
            </div>
            <div class="complete">
              {userss.map((task) =>
                task.iscompleted ? (
                  <div class=" progress progress-tasks-input ">
                    <p class="white">{task.tasks} </p>
                    {completed++}
                    <span class="btn">
                      <a href="">
                        <i class="fas fa-check-circle green"></i>
                      </a>
                    </span>
                  </div>
                ) : null
              )}
            </div>

            <div class="tittle">
              <h1 class="progress progress-tasks-input red">
                Incompleted task
                <span class="btn">
                  <a href="">
                    <i class="fas fa-times-circle red"></i>
                  </a>
                </span>
              </h1>
            </div>
            <div class="incomplete">
              {userss.map((task) =>
                !task.iscompleted ? (
                  <div class=" progress progress-tasks-input ">
                    <p class="white">{task.tasks} </p>
                    {incompleted++}
                    <span class="btn">
                      <a href="">
                        <i class="fas fa-times-circle red "></i>
                      </a>
                    </span>
                  </div>
                ) : null
              )}
            </div>
            <div class="Points yellow">
              <p>{`${Math.trunc((completed / (completed+incompleted)) * 10)} points`}</p>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
}


Progress.propTypes = {
  addtask: PropTypes.func.isRequired,
  loadtask: PropTypes.node.isRequired,
  task: PropTypes.object.isRequired,
  deletetasks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  task: state.task,
});

export default connect(mapStateToProps, { addtask, loadtask, deletetasks })(
  Progress
);
