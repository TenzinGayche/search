import axios from "axios";
import {
  CURRENT_USER,
  CURRENT_FAIL,
  LOGIN,
  LOGOUT,

  ADD_TASK,
  ADD_FAIL,

  LOGIN_FAIL,
} from "../actions/types";
import { setAlert } from "./alert";

export const currentuser = (current) => async (dispatch) => {
  try {
    console.log(current);
    dispatch({
      type: CURRENT_USER,
      payload: current,
    });
  } catch (err) {
    console.log(err);

    dispatch({
      type: CURRENT_FAIL,
    });
  }
};

export const login = (data) => async (dispatch) => {
  try {
    const config = {
      "Content-Type": "application/json",
    };
    console.log(data);

    const res = await axios.post(
      "api/users/auth",
      data,
      config
    );
    console.log("actions");
    dispatch({
      type: LOGIN,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT,
    });
  } catch (err) {
    console.log(err);

    dispatch({
      type: LOGOUT,
    });
  }
};
export const currentfail = () => async (dispatch) => {
  try {
    dispatch({
      type: CURRENT_FAIL,
    });
  } catch (err) {
    console.log(err);

    dispatch({
      type: CURRENT_FAIL,
    });
  }
};

export const addtask = (id,data) => async (dispatch) => {
  try {
    const config = {
      "Content-Type": "application/json",
    };
console.log(id);
    const res = await axios.put(
      `api/users/tasks/${id}`,
      data,
      config
    );

    dispatch({
      type: ADD_TASK,
      payload:res.data
    });
  } catch (err) {
    dispatch({
      type: ADD_FAIL,
    });

    console.log(err);
  }
};

export const notcurrent = () => async (dispatch) => {
  try {
    
    dispatch({
      type: CURRENT_FAIL,
     
    });
  } catch (err) {
    console.log(err);

    dispatch({
      type: CURRENT_FAIL,
    });
  }
};
