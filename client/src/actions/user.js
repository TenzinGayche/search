import {
  REGISTER_SUCCESFUL,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOAD_USER,
  ISCURRENT,
  ISCURRENT_FAIL,
  CURRENT_USER,
  LOG_ERROR,
  LOGIN,
  LOGOUT,
  LOADTASK,
} from "../actions/types";
import axios from "axios";
export const loadUser = () => async (dispatch) => {
  try {
    
    const config = {
      "Content-Type": "application/json",
    };
    const res = await axios.get("/api/users", {}, config);
    console.log("actions");
    dispatch({
      type: LOAD_USER,
      payload: res.data,
      
    });
  } catch (err) {
    console.log(err);

    dispatch({
      type: AUTH_ERROR,
    });
  }
};
export const isCurrent = () => async (dispatch) => {
  try {
   
    dispatch({
      type: ISCURRENT,
     
    });
  } catch (err) {
    console.log(err);

    dispatch({
      type: ISCURRENT_FAIL,
    });
  }
};


