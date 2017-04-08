import React from "react";
import { Tracker } from "meteor/tracker";
import { LinksApi } from "../api/links";

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }

  componentDidMount() {
    Tracker.autorun(() => {
      const links = LinksApi.find().fetch();
      this.setState({ links });
    });
  }

  renderLinksListItems() {
    return this.state.links.map(link => {
      return <p key={link._id}>{link.url}</p>;
    });
  }

  render() {
    return (
      <div>
        <p>Links List</p>
        <div>
          {this.renderLinksListItems()}
        </div>
      </div>
    );
  }
}
