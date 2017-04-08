import { Meteor } from "meteor/meteor";
import React from "react";
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

import Login from "../ui/Login";
import Signup from "../ui/Signup";
import Links from "../ui/Links";
import NotFound from "../ui/NotFound";

const unauthenticatedPages = ["/", "/signup"];
const authenticatedPages = ["/links"];

const onEnterLoginPage = () => {
  if (Meteor.userId()) {
    return <Redirect to="/links" />;
  } else {
    return <Login />;
  }
};

const onEnterSignupPage = () => {
  if (Meteor.userId()) {
    return <Redirect to="/links" />;
  } else {
    return <Signup />;
  }
};

const onEnterLinksPage = () => {
  if (Meteor.userId()) {
    return <Links />;
  } else {
    return <Redirect to="/" />;
  }
};

export const onAuthChange = isAuthenticated => {
  const pathName = history.location.pathname;
  const isUnAuthenticatedPage = unauthenticatedPages.includes(pathName);
  const isAuthenticatedPage = authenticatedPages.includes(pathName);

  if (isUnAuthenticatedPage && isAuthenticated) {
    history.push("/links");
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.push("/");
  }

  console.log("isAuthenticated", isAuthenticated);
};

export const routes = (
  <Router>
    <Switch>
      <Route exact path="/" render={onEnterLoginPage} />
      <Route exact path="/signup" render={onEnterSignupPage} />
      <Route exact path="/links" render={onEnterLinksPage} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);
