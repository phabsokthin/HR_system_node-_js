'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeeModel extends Model {
    static associate(models) {}
  }
  EmployeeModel.init(
    {
      employee_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fname: {
        type: DataTypes.STRING,
      },
      lname: {
        type: DataTypes.STRING
      },
      
      sex:{
        type: DataTypes.STRING
      },
      dob: {
        type: DataTypes.DATE
      },
    
      phone: {
        type: DataTypes.STRING,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      hire_date: {
        type: DataTypes.DATE
      },
      job_id: {
        type: DataTypes.INTEGER,
      },
      image: {
        type: DataTypes.STRING
      },
      url: {
        type: DataTypes.STRING
      },
      employee_no: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      tableName: "employee",
      modelName: 'EmployeeModel',
    }
  );
  return EmployeeModel;
};
