import { Meteor } from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";

import Signup from "../imports/ui/Signup";
import Link from "../imports/ui/Link";
import NotFound from "../imports/ui/NotFound";

const browserHistory = createBrowserHistory();

const routes = (
  <Router history={browserHistory}>
    <div>
      <Route path="/signup" component={Signup} />
      <Route path="/link" component={Link} />
      <Route path="*" component={NotFound} />
    </div>
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById("app"));
});
