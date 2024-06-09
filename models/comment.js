const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_content: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1],
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "post",
        key: "id",
      },
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
  },
  },
  {
  sequelize,
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: "comment",
  }
  );
  module.exports = Comment