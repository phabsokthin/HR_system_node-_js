'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class JobModel extends Model {
        static associate(models) { }
    }
    JobModel.init(
        {
            job_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            job_name: {
                type: DataTypes.STRING,
                unique: true
            },
            min_salary: {
                type: DataTypes.STRING,
            },
            max_salary: {
                type: DataTypes.STRING
            }
        },
        {
            sequelize,
            tableName: "jobs",
            modelName: 'JobModel',
        }
    );
    return JobModel;
};
