import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import shortid from "shortid";

export const LinksApi = new Mongo.Collection("links");

if (Meteor.isServer) {
  Meteor.publish("linksPublication", function () {
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
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true
    });
  },
  "links.setVisibility"(_id, visible) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      visible: {
        type: Boolean
      }
    }).validate({ _id, visible });

    LinksApi.update({
      _id,
      userId: this.userId
    }, {
        $set: { visible }
      }
    );
  }
});
