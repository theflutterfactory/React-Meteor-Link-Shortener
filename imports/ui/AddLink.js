import React from "react";
import { Meteor } from "meteor/meteor";

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    }
  }

  onSubmit(e) {
    const url = this.state.url;
    e.preventDefault();

    if (url) {
      Meteor.call("links.insert", url, () => {
        if (!err) {
          this.setState({ url: '' })
        }
      });
    }
  }

  onChange(e) {
    this.setState({
      url: e.target.value
    })
  }

  render() {
    return (
      <div>
        <p>Add Links</p>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input
            type="text"
            placeholder="URL"
            value={this.state.url}
            onChange={this.onChange.bind(this)} />
          <button>Add Link</button>
        </form>
      </div>
    );
  }
}
