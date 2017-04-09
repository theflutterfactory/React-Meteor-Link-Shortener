import React from "react";
import LinksList from "./LinksList";
import PrivateHeader from "./PrivateHeader";
import AddLink from "./AddLink";

export default class Links extends React.Component {
  render() {
    return (
      <div>
        <PrivateHeader title="Your Links" />
        <LinksList />
        <AddLink />
      </div>
    );
  }
}
