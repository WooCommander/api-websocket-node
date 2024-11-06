const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const ProductGroup = require('./ProductGroup');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productGroupId: {
    type: DataTypes.UUID,
    references: {
      model: ProductGroup,
      key: 'id',
    },
    allowNull: false,
  },
});

module.exports = Product;