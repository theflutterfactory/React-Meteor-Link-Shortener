import React from "react";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { Session } from "meteor/session";
import { LinksApi } from "../api/links";
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
      const links = LinksApi.find({
        visible: Session.get("showVisible")
      }).fetch();
      this.setState({ links });
    });
  }

  componentWillUnmount() {
    console.log("componentWillUnmount LL");
    this.linksTracker.stop();
  }

  renderLinksListItems() {
    if (this.state.links.length === 0) {
      return (
        <div className="item">
          <h1 className="item--status-message">No Links Found</h1>
        </div>
      );
    }

    return this.state.links.map(link => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />;
    });
  }

  render() {
    return (
      <div>
        <div>
          {this.renderLinksListItems()}
        </div>
      </div>
    );
  }
}
