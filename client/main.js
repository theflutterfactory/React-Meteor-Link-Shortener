import { Meteor } from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import createHistory from "history/createBrowserHistory";
const history = createHistory({
  forceRefresh: true
});

import { Tracker } from "meteor/tracker";

import Login from "../imports/ui/Login";
import Signup from "../imports/ui/Signup";
import Links from "../imports/ui/Links";
import NotFound from "../imports/ui/NotFound";

const unauthenticatedPages = ["/", "/signup"];
const authenticatedPages = ["/links"];

const routes = (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/links" component={Links} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const pathName = history.location.pathname;
  const isUnAuthenticatedPage = unauthenticatedPages.includes(pathName);
  const isAuthenticatedPage = authenticatedPages.includes(pathName);

  if (isUnAuthenticatedPage && isAuthenticated) {
    history.push("/links");
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.push("/");
  }

  console.log("isAuthenticated", isAuthenticated);
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById("app"));
});
