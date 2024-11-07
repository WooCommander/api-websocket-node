import { DataTypes } from 'sequelize';
import { define } from '../config/db.mjs';
import ProductGroup from './productGroupModel.mjs';

const Product = define('Product', {
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

export default Product;