/* eslint-disable */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Price.init({
    number: DataTypes.INTEGER,
    content: DataTypes.STRING,
    probability: DataTypes.INTEGER,
    imageUrl: DataTypes.TEXT,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Price',
  });
  return Price;
};