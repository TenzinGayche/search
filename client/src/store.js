import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// set up a store subscription listenerlet currentState = store.getState();

store.subscribe(() => {
    
   currentState = store.getState();
  // keep track ofhe previous and current state to compare changes
 
});
// to store the users token in localStorage

// initialize current state from redux store for subscription comparison
// preventing undefined error

let currentState = store.getState();
export default store;
