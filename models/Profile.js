const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');  

class Like extends Model {}

Like.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',  
            key: 'id'
        }
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Posts',  
            key: 'id'
        }
    },
    createDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Like',
    tableName: 'likes',  
    timestamps: false  
});

module.exports = Like;