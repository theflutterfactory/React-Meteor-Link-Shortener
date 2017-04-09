import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";

export const LinksApi = new Mongo.Collection("links");

if (Meteor.isServer) {
  Meteor.publish("linksPublication", function() {
    //Find all links that belong to the currently logged in user
    return LinksApi.find({ userId: this.userId });
  });
}

Meteor.methods({
  "links.insert"(url) {
    if (!this.userId) {
      //Prevents a user from inserting links if not logged int
      throw new Meteor.Error("not-authorized");
    }

    new SimpleSchema({
      url: {
        type: String,
        label: "Your link",
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({ url });

    LinksApi.insert({
      url,
      userId: this.userId
    });
  }
});
