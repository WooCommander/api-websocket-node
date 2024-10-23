const Product = require('../models/productModel');

// Добавление товара
const addProduct = async (name, price) => {
  try {
    const newProduct = await Product.create({ name, price });
    return { success: true, product: newProduct };
  } catch (error) {
    console.error('Ошибка добавления товара:', error);
    return { success: false, error: 'Не удалось добавить товар' };
  }
};

// Получение списка товаров
const getProducts = async () => {
  try {
    const products = await Product.findAll();
    return { success: true, products };
  } catch (error) {
    console.error('Ошибка получения списка товаров:', error);
    return { success: false, error: 'Не удалось получить список товаров' };
  }
};

// Удаление товара
const deleteProduct = async (id) => {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return { success: false, error: 'Товар не найден' };
    }
    await product.destroy();
    return { success: true, message: 'Товар удалён' };
  } catch (error) {
    console.error('Ошибка удаления товара:', error);
    return { success: false, error: 'Не удалось удалить товар' };
  }
};

module.exports = { addProduct, getProducts, deleteProduct };
