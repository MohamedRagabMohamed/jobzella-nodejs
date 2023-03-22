const user = require("../admin/User/route");
const group = require("../admin/Group/route");
const Task = require("../admin/Task/route");
const Status = require("../admin/Status/route");

module.exports = function (app) {
  app.use("/user", user);
  app.use("/group", group);
  app.use("/task", Task);
  app.use("/status", Status);
};
