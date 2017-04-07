import { Meteor } from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

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

const onEnterLoginPage = () => {
  console.log("onEnterLoginPage called");
  if (Meteor.userId()) {
    console.log("pushing links");
    return <Redirect to="/links" />;
  } else {
    return <Login />;
  }
};

const onEnterSignupPage = () => {
  console.log("onEnterSignupPage called");
  if (Meteor.userId()) {
    console.log("pushing links");
    return <Redirect to="/links" />;
  } else {
    return <Signup />;
  }
};

const onEnterLinksPage = () => {
  console.log("onEnterLinksPage called");
  if (Meteor.userId()) {
    console.log("pushing links");
    return <Links />;
  } else {
    return <Redirect to="/" />;
  }
};

const routes = (
  <Router>
    <Switch>
      <Route exact path="/" render={onEnterLoginPage} />
      <Route exact path="/signup" render={onEnterSignupPage} />
      <Route exact path="/links" render={onEnterLinksPage} />
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
