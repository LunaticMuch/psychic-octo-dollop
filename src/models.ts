import { Sequelize, DataTypes } from "sequelize";
import SQLite from "sqlite3";

const db: Sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  dialectOptions: {
    mode: SQLite.OPEN_SHAREDCACHE | SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE,
  },
});

const User = db.define(
  "User",
  {
    userId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  { modelName: "user" }
);

const Task = db.define(
  "task",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    key: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    user: {
      type: DataTypes.STRING,
      references: {
        model: "user",
        key: "userId",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  { modelName: "task" }
);

Task.belongsTo(User);
User.hasMany(Task);

export { Task, User };
