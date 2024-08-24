'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobHistoryModel extends Model {
    static associate(models) {}
  }
  JobHistoryModel.init(
    {
      job_h_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      employee_id: {
        type: DataTypes.INTEGER
      },
      start_date: {
        type: DataTypes.DATE
      },
      end_date: {
        type: DataTypes.DATE
      },
      location_id: {
        type: DataTypes.INTEGER
      },
      job_title: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      tableName: "job_history",
      modelName: 'JobHistoryModel',
    }
  );
  return JobHistoryModel;
};
