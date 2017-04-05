import React from "react";

export default class Links extends React.Component {
  onLogout() {
    return this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <h1>Your Links</h1>
        <button onClick={this.onLogout.bind(this)}>Logout</button>
      </div>
    );
  }
}

// Links.contextTypes = {
//   router: React.PropTypes.object.isRequired
// };
