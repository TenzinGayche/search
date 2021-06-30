import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Progress from "./components/Progress";
import Home from "./components/Home";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Alltasks from "./components/Alltask";
import { Fragment } from "react";
import store from "./store";
import { Provider } from "react-redux";
import { loadUser } from "./actions/user";
import React, { useEffect } from "react";
import Profile from "./components/Profile";
import Admin from "./components/Admin";
import Date from "./components/Date";



function App() {




  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Home} />

          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Progress} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/alltasks" component={Alltasks} />
            <Route exact path="/date" component={Date} />
            <Route exact path="/progress" component={Progress} />
            <Route exact path="/admin" component={Admin} />
          </Switch>
          <Alert />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
