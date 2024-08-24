'use strict';
const { Model, DATE } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserModel extends Model {
        static associate(models) { }
    }
    UserModel.init(
        {
            uid: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            names: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING
            },
            refreshToken: {
                type: DataTypes.STRING
            }
        },
        {
            sequelize,
            tableName: "users",
            modelName: 'UserModel',
        }
    );
    return UserModel;
};
