const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Likes extends Model {}

Likes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    post_Id:{
      type: DataTypes.INTEGER,
      references: {
        model: "post",
        key: "id",
      },
    },
    user_Id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'likes',
  }
);

module.exports = Likes;