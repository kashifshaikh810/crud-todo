import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ToDo from "../Main/index";
import Login from "../Authantication/Login/index";
import SignUp from "../Authantication/Signup/index";

function Routing() {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard" component={ToDo} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
}

export default Routing;
