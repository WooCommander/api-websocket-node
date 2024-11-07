import Product, { belongsTo, hasMany } from './Product';
import ProductGroup, { hasMany as _hasMany } from './ProductGroup';
import ProductPrice, { belongsTo as _belongsTo } from './ProductPrice';
import User, { hasMany as __hasMany } from './User';

// Ассоциации
belongsTo(ProductGroup, { foreignKey: 'productGroupId' });
_hasMany(Product, { foreignKey: 'productGroupId' });

hasMany(ProductPrice, { foreignKey: 'productId' });
_belongsTo(Product, { foreignKey: 'productId' });

__hasMany(ProductPrice, { foreignKey: 'userId' }); // Пользователь может фиксировать много цен
_belongsTo(User, { foreignKey: 'userId' }); // Цена связана с одним пользователем

export default { Product, ProductGroup, ProductPrice, User };
