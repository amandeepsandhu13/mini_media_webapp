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
    followedId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    followerId: {
      type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
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
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'follows',
  }
);

module.exports = Follows;