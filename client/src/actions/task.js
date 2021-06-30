import axios from "axios";
import {
  CURRENT_USER,
  CURRENT_FAIL,
  LOGIN,
  LOGOUT,
  AUTH_ERROR,
  ISCOMPLETED,
  ADD_TASK,
  ADD_FAIL,
  LOADTASK,
  ISDELETED,
  ADMIN,
  ADMIN_NOT,
  LOAD_FAIL
} from "../actions/types";

export const loadtask = (id) => async (dispatch) => {
  try {
    const config = {
      "Content-Type": "application/json",
    };
   
    const res = await axios.get(
      `/api/users/tasks/${id}`,
      {},
      config
    );

    dispatch({
      type: LOADTASK,
      payload: res.data,
     
    });
  } catch (err) {
    dispatch({
      type: LOAD_FAIL,
    });

    console.log(err);
  }
};
export const deletetasks = (id, task) => async (dispatch) => {
  try {
    const config = {
      "Content-Type": "application/json",
    };

    const res = await axios.delete(
      `/api/users/${id}/task/${task}`,
      {},
      config
    );
    console.log(res.data);

    dispatch({
      type: ISDELETED,
    });
  } catch (err) {
    console.log(err);
  }
};
export const iscompleted = (id, comment) => async (dispatch) => {
  try {
    const config = {
      "Content-Type": "application/json",
    };

    const res = await axios.put(
      `/api/users/${id}/task/${comment}`,
      {},
      config
    );

    dispatch({
      type: ISCOMPLETED,
    });
  } catch (err) {
    console.log(err);
  }
};
export const isadmins = () => async (dispatch) => {
  try {
  
    dispatch({
      type: ADMIN,
   
    });
  } catch (err) {
  

    console.log(err);
  }
};
export const notadmins = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_NOT,
    });
  } catch (err) {
    console.log(err);
  }
};

