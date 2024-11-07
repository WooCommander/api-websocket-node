import { DataTypes } from 'sequelize';
import { define } from '../config/db.mjs';
import Product from './productModel.mjs';
import User from './userModel.mjs'; // Импортируем модель User

// Увеличиваем лимит слушателей событий
import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 20;

const ProductPrice = define('ProductPrice', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  productId: {
    type: DataTypes.UUID,
    references: {
      model: Product,
      key: 'id',
    },
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  dateRegister: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

export default ProductPrice;
