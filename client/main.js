import { Meteor } from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import Signup from "./../imports/ui/Signup";
import Link from "./../imports/ui/Link";

Meteor.startup(() => {
  ReactDOM.render(<Link />, document.getElementById("app"));
});
