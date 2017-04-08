import { Meteor } from "meteor/meteor";
import React from "react";
import { Router, Route, browserHistory } from "react-router";

import Login from "../ui/Login";
import Signup from "../ui/Signup";
import Links from "../ui/Links";
import NotFound from "../ui/NotFound";

const unauthenticatedPages = ["/", "/signup"];
const authenticatedPages = ["/links"];

const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace("/links");
  }
};

const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace("/");
  }
};

export const onAuthChange = isAuthenticated => {
  const pathName = browserHistory.getCurrentLocation().pathname;
  const isUnAuthenticatedPage = unauthenticatedPages.includes(pathName);
  const isAuthenticatedPage = authenticatedPages.includes(pathName);

  if (isUnAuthenticatedPage && isAuthenticated) {
    browserHistory.push("/links");
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.push("/");
  }

  console.log("isAuthenticated", isAuthenticated);
};

export const routes = (
  <Router history={browserHistory}>
    <div>
      <Route exact path="/" component={Login} onEnter={onEnterPublicPage} />
      <Route
        exact
        path="/signup"
        component={Signup}
        onEnter={onEnterPublicPage}
      />
      <Route
        exact
        path="/links"
        component={Links}
        onEnter={onEnterPrivatePage}
      />
      <Route path="*" component={NotFound} />
    </div>
  </Router>
);
