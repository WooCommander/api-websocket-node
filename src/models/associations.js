const Product = require('./Product');
const ProductGroup = require('./ProductGroup');
const ProductPrice = require('./ProductPrice');
const User = require('./User');

// Ассоциации
Product.belongsTo(ProductGroup, { foreignKey: 'productGroupId' });
ProductGroup.hasMany(Product, { foreignKey: 'productGroupId' });

Product.hasMany(ProductPrice, { foreignKey: 'productId' });
ProductPrice.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(ProductPrice, { foreignKey: 'userId' }); // Пользователь может фиксировать много цен
ProductPrice.belongsTo(User, { foreignKey: 'userId' }); // Цена связана с одним пользователем

module.exports = { Product, ProductGroup, ProductPrice, User };
