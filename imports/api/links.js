import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const LinksApi = new Mongo.Collection("links");

if (Meteor.isServer) {
  Meteor.publish("linksPublication", function() {
    return LinksApi.find({ userId: this.userId });
  });
}
