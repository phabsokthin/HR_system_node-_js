'use strict';
const { Model, DATE, INTEGER } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LocationModel extends Model {
    static associate(models) {}
  }
  LocationModel.init(
    {
      location_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      street_address: {
        type: DataTypes.STRING
      },
      postal_code: {
        type: DataTypes.STRING
      },
      city: {
        type: DataTypes.STRING
      },
      state_province: {
        type: DataTypes.STRING
      },
      country_id: {
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      tableName: "location",
      modelName: 'LocationModel',
    }
  );
  return LocationModel;
};
