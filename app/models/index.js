const Sequelize = require("sequelize");
const db = require("../Database/index")();
const userModel = require("./User");
const statusModel = require("./status");
const taskModel = require("./task");
const groupModel = require("./group");

const User = userModel(db, Sequelize);
const Status = statusModel(db, Sequelize);
const Task = taskModel(db, Sequelize);
const Group = groupModel(db, Sequelize);

//Task has many to one relation with Status
Task.belongsTo(Status, {
  foreignKey: "status_id",
});
Status.hasMany(Task, {
  foreignKey: "status_id",
});

//Task has many to one relation with Group
Task.belongsTo(Group, {
  foreignKey: "group_id",
});
Group.hasMany(Task, {
  foreignKey: "group_id",
});

//Group has many to one relation with User
Group.belongsTo(User, {
  foreignKey: "user_id",
});
User.hasMany(Group, {
  foreignKey: "user_id",
});

db.sync({ force: false })
  .then((res) => {
    console.log("tables created");
  })
  .catch((error) => {
    console.log("Error", error);
  });

module.exports = {
  User,
  Status,
  Task,
  Group,
};
