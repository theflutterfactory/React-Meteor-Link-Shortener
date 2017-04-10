import React from "react";
import { Session } from "meteor/session";

export default class LinksListFilters extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showVisible: true
    }
  }

  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      this.setState({
        "showVisible": Session.get("showVisible")
      })
    });
  }

  componentWillUnmount() {
    this.linksTracker.stop();
  }

  render() {
    return (
      <div>
        <label>
          <input
            type="checkbox"
            checked={!this.state.showVisible}
            onChange={e => {
              Session.set("showVisible", !e.target.checked);
            }} />
          show hidden files
      </label>
      </div>
    );
  }
}
