import React from "react";
import { Link } from "react-router-dom";

export default class Signup extends React.Component {
  render() {
    return (
      <div>
        <h1>Sign up for Link Shortener</h1>
        <p>Sign up form</p>
        <Link to="/">Have an account?</Link>
      </div>
    );
  }
}
