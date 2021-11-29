
import {

  AUTH_ERROR,
  LOAD_USER,

  ADD_FAIL,
  ISCURRENT,
  CURRENT_FAIL,
} from "../actions/types";
import store from "../store";
const initialState = {
   iscurrent:false,

  user: null,
};
function registerReducer(state = initialState, action) {
  const { type, payload } = action;


  switch (type) {
    case LOAD_USER:
      console.log("reduser");
      localStorage.setItem("auth", payload);
      return {
        ...state,
        user: payload,
      };

    case ISCURRENT:
      return {
        ...state,
        iscurrent: true,
      };
    case CURRENT_FAIL:
      return {
        ...state,
        iscurrent: false,
      
      };
    case ADD_FAIL:
      return { ...state, user: null };

    case AUTH_ERROR:
      localStorage.removeItem("user");
      return {
        ...state,

        user: null,
      };

    default:
      return state;
  }
}

export default registerReducer;
