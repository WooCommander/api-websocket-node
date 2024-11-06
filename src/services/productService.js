const Product = require('../models/productModel');
const ProductGroup = require('../models/productGroupModel');
const ProductPrice = require('../models/productPriceModel');

// Добавление товара с группой и начальной ценой
const addProduct = async (name, productGroupId, initialPrice) => {
  if (!name || !productGroupId || initialPrice === undefined) {
    return { success: false, error: 'Имя товара, группа и начальная цена обязательны' };
  }

  try {
    const group = await ProductGroup.findByPk(productGroupId);
    if (!group) {
      return { success: false, error: 'Указанная группа продуктов не найдена' };
    }

    const newProduct = await Product.create({ name, productGroupId });
    await ProductPrice.create({
      productId: newProduct.id,
      price: initialPrice,
      quantity: 1,
      dateRegister: new Date(),
    });

    return { success: true, product: newProduct };
  } catch (error) {
    console.error('Ошибка добавления товара:', error);
    return { success: false, error: 'Не удалось добавить товар' };
  }
};

// Получение списка товаров с информацией о группах и последней ценой
const getProducts = async () => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: ProductGroup,
          attributes: ['name'],
        },
        {
          model: ProductPrice,
          attributes: ['price', 'quantity', 'dateRegister'],
          order: [['dateRegister', 'DESC']],
          limit: 1,
        },
      ],
    });
    return { success: true, products };
  } catch (error) {
    console.error('Ошибка получения списка товаров:', error);
    return { success: false, error: 'Не удалось получить список товаров' };
  }
};

// Обновление товара
const updateProduct = async (id, name, productGroupId) => {
  if (!id || !name || !productGroupId) {
    return { success: false, error: 'ID товара, новое имя и группа обязательны' };
  }

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return { success: false, error: 'Товар не найден' };
    }

    const group = await ProductGroup.findByPk(productGroupId);
    if (!group) {
      return { success: false, error: 'Группа продуктов не найдена' };
    }

    product.name = name;
    product.productGroupId = productGroupId;
    await product.save();

    return { success: true, product };
  } catch (error) {
    console.error('Ошибка изменения товара:', error);
    return { success: false, error: 'Не удалось изменить товар' };
  }
};

// Удаление товара и связанных данных о ценах
const deleteProduct = async (id) => {
  if (!id) {
    return { success: false, error: 'ID товара обязателен' };
  }

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return { success: false, error: 'Товар не найден' };
    }

    await ProductPrice.destroy({ where: { productId: id } });
    await product.destroy();

    return { success: true, message: 'Товар и все связанные данные удалены' };
  } catch (error) {
    console.error('Ошибка удаления товара:', error);
    return { success: false, error: 'Не удалось удалить товар' };
  }
};

module.exports = { addProduct, getProducts, updateProduct, deleteProduct };
