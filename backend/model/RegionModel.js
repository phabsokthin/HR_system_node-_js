'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RegionModel extends Model {
    static associate(models) {}
  }
  RegionModel.init(
    {
      region_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      region_name: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      tableName: "region",
      modelName: 'RegionModel',
    }
  );
  return RegionModel;
};
