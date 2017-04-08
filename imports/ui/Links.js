import React from "react";
import { Accounts } from "meteor/accounts-base";
import { LinksApi } from "../api/links";
import LinksList from "./LinksList";

export default class Links extends React.Component {
  onLogout() {
    Accounts.logout();
  }

  onSubmit(e) {
    const url = this.refs.url.value.trim();
    e.preventDefault();

    if (url) {
      LinksApi.insert({ url });
      this.refs.url.value = "";
    }
  }

  render() {
    return (
      <div>
        <h1>Your Links</h1>
        <button onClick={this.onLogout.bind(this)}>Logout</button>
        <LinksList />
        <p>Add Links</p>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" ref="url" placeholder="URL" />
          <button>Add Link</button>
        </form>
      </div>
    );
  }
}
