'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CountryModel extends Model {
    static associate(models) {}
  }
  CountryModel.init(
    {
      country_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      country_name: {
        type: DataTypes.STRING
      },
      region_id: {
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      tableName: "country",
      modelName: 'CountryModel',
    }
  );
  return CountryModel;
};
