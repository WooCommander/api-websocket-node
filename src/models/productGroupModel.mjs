import { DataTypes } from 'sequelize';
import { define } from '../config/db.mjs'; // Убедитесь, что путь и расширение файла правильные

const ProductGroup = define('ProductGroup', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

export default ProductGroup;