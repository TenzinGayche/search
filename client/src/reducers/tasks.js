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
  ADMIN,
  ISDELETED,
  ADMIN_NOT,
  LOAD_FAIL

} from "../actions/types";

const initialState = {
  tasks: [],
  isadmin:false
};
function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOADTASK:
      return {
        ...state,

        tasks: payload,
      };
    case LOAD_FAIL:
      return {
        ...state,
        

        tasks: null,
      };
    case ISDELETED:
      return {
        ...state,
      };
    case ADMIN:
      return {
        ...state,
        isadmin: true,
      };
    case ADMIN_NOT:
      return {
        ...state,
        isadmin: false,
      };

    default:
      return state;
  }
}

export default userReducer;
