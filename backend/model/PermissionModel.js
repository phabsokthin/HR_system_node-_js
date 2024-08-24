'use strict';
const { Model, INTEGER } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PermissionModel extends Model {
    static associate(models) {}
  }
  PermissionModel.init(
    {
      per_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      employee_id: {
        type: DataTypes.INTEGER
      },
      status: {
        type: DataTypes.STRING,
      },
      dates: {
        type: DataTypes.DATE
      },
      details: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      tableName: 'permission',
      modelName: 'PermissionModel',
    }
  );
  return PermissionModel;
};
