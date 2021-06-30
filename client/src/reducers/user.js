import {

  
  CURRENT_USER,
  CURRENT_FAIL,
  LOGIN,
  LOGOUT,
  ADD_TASK,
  ADD_FAIL,
  ISCURRENT,
  ISCOMPLETED,
  LOADTASK,
  LOGIN_FAIL
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: null,
};
function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CURRENT_USER:
      console.log("reduser ");
      localStorage.setItem("user", payload);

      return {
        ...state,
        isAuthenticated: false,
        user: payload,
      };
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
      };
    case ADD_TASK:
      return {
        ...state,
        isAuthenticated: true,
      };

    case LOADTASK:
    case ISCOMPLETED:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
       
      };

    case CURRENT_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      
      };

    default:
      return state;
  }
}

export default userReducer;
