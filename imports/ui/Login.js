import React from "react";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };
  }

  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.emailRef.value.trim();
    let password = this.refs.passwordRef.value.trim();

    Meteor.loginWithPassword({ email }, password, err => {
      console.log("Login callback", err);
    });
  }

  render() {
    return (
      <div>
        <h1>Link Shortener</h1>
        {this.state.error ? <p>{this.state.error}</p> : undefined}

        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="email" ref="emailRef" name="email" placeholder="Email" />
          <input
            type="password"
            ref="passwordRef"
            name="password"
            placeholder="Password"
          />
          <button>Login</button>
        </form>
        <Link to="/signup">Don't have an account? Signup</Link>
      </div>
    );
  }
}
