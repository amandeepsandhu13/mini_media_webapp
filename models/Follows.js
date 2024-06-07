const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Follows extends Model {}

Follows.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    following_Id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
      },
    follower_Id: {
      type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
    },
    


  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Follows;