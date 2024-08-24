'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CardEmployeeModel extends Model {
        static associate(models) { }
    }
    CardEmployeeModel.init(
        {
            card_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            employee_id: {
                type: DataTypes.INTEGER
            },
            dates: {
                type: DataTypes.DATE
            },
            job_id: {
                type: DataTypes.INTEGER
            }
        },
        {
            sequelize,
            tableName: "card_employee",
            modelName: 'CardEmployeeModel',
        }
    );
    return CardEmployeeModel;
};
