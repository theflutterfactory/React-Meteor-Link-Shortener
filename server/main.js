import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";

import "../imports/api/users";
import { LinksApi } from "../imports/api/links";
import "../imports/startup/simple-schema-config";

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = LinksApi.findOne({ _id });

    if (link) {
      res.statusCode = 302;
      res.setHeader("Location", link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }
  });
});
