import React from "react";
import ClipBoard from "clipboard";

export default class LinksListItem extends React.Component {
  componentDidMount() {
    this.clipboard = new ClipBoard(this.refs.copy);

    this.clipboard
      .on("success", e => {
        console.info("Action:", e.action);
        console.info("Text:", e.text);
        console.info("Trigger:", e.trigger);

        e.clearSelection();
      })
      .on("error", e => {
        console.error("Action:", e.action);
        console.error("Trigger:", e.trigger);
      });
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  render() {
    return (
      <div>
        <p>{this.props.url}</p>
        <p>{this.props.shortUrl}</p>
        <button ref="copy" data-clipboard-text={this.props.shortUrl}>
          Copy
        </button>
      </div>
    );
  }
}

LinksListItem.propTypes = {
  _id: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired,
  shortUrl: React.PropTypes.string.isRequired
};
