import React from "react";
import { Tracker } from "meteor/tracker";
import { LinksApi } from "../api/links";
import { Meteor } from "meteor/meteor";
import LinksListItem from "./LinksListItem";

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }

  componentDidMount() {
    console.log("componentDidMount LL");
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe("linksPublication");
      const links = LinksApi.find().fetch();
      this.setState({ links });
    });
  }

  componentWillUnmount() {
    console.log("componentWillUnmount LL");
    this.linksTracker.stop();
  }

  renderLinksListItems() {
    return this.state.links.map(link => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />;
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
