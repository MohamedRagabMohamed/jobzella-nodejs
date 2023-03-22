module.exports = function (db, DataTypes) {
  return db.define(
    "task",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        validate: { len: [3, 100] },
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(500),
        validate: { len: [3, 500] },
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
      tableName: "task",
    }
  );
};
