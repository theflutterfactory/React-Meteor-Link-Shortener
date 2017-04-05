import React from "react";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
  render() {
    return (
      <div>
        <h1>Login to Link Shortener</h1>
        <p>Login Form</p>
        <Link to="/signup">Don't have an account? Signup</Link>
      </div>
    );
  }
}
