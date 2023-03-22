const bcrypt = require("bcrypt");

module.exports = function (db, DataTypes) {
  return db.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(320),
        allowNull: false,
        validate: {
          len: [0, 320],
          isEmail: {
            atrs: true,
            msg: "Please insert valid email",
          },
          notNull: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          set(value) {
            this.setDataValue("password", bcrypt.hashSync(value, 10));
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        validate: {
          set(value) {
            this.setDataValue("phone_number", value);
          },
        },
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
      tableName: "user",
    }
  );
};
