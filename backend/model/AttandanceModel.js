'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AttandanceModel extends Model {
    static associate(models) {}
  }
  AttandanceModel.init(
    {
      att_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      employee_id: {
        type: DataTypes.INTEGER
      },
      dates: {
        type: DataTypes.DATE
      },
      details: {
        type: DataTypes.STRING
      },
      from_time:{
        type: DataTypes.STRING
      },
      to_time: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      tableName: "attandance",
      modelName: 'AttandanceModel',
    }
  );
  return AttandanceModel;
};
