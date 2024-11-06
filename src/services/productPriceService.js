const ProductPrice = require('../models/productPriceModel');
const Product = require('../models/productModel');

// Добавление записи о цене для продукта
const addProductPrice = async (productId, price, quantity, dateRegister = new Date()) => {
  if (!productId || price === undefined || quantity === undefined) {
    return { success: false, error: 'ID продукта, цена и количество обязательны' };
  }

  try {
    // Проверка, существует ли продукт
    const product = await Product.findByPk(productId);
    if (!product) {
      return { success: false, error: 'Продукт не найден' };
    }

    // Создание новой записи о цене
    const newPriceRecord = await ProductPrice.create({ productId, price, quantity, dateRegister });
    return { success: true, productPrice: newPriceRecord };
  } catch (error) {
    console.error('Ошибка добавления записи о цене:', error);
    return { success: false, error: 'Не удалось добавить запись о цене' };
  }
};

// Получение всех записей о ценах для конкретного продукта
const getProductPrices = async (productId) => {
  if (!productId) {
    return { success: false, error: 'ID продукта обязателен' };
  }

  try {
    const prices = await ProductPrice.findAll({
      where: { productId },
      order: [['dateRegister', 'DESC']], // Получение записей в порядке даты добавления (последние сначала)
    });
    return { success: true, prices };
  } catch (error) {
    console.error('Ошибка получения списка цен:', error);
    return { success: false, error: 'Не удалось получить список цен' };
  }
};

// Обновление записи о цене
const updateProductPrice = async (id, price, quantity, dateRegister) => {
  if (!id || price === undefined || quantity === undefined) {
    return { success: false, error: 'ID записи, цена и количество обязательны' };
  }

  try {
    const priceRecord = await ProductPrice.findByPk(id);
    if (!priceRecord) {
      return { success: false, error: 'Запись о цене не найдена' };
    }

    priceRecord.price = price;
    priceRecord.quantity = quantity;
    priceRecord.dateRegister = dateRegister || new Date();
    await priceRecord.save();

    return { success: true, productPrice: priceRecord };
  } catch (error) {
    console.error('Ошибка обновления записи о цене:', error);
    return { success: false, error: 'Не удалось обновить запись о цене' };
  }
};

// Удаление записи о цене
const deleteProductPrice = async (id) => {
  if (!id) {
    return { success: false, error: 'ID записи о цене обязателен' };
  }

  try {
    const priceRecord = await ProductPrice.findByPk(id);
    if (!priceRecord) {
      return { success: false, error: 'Запись о цене не найдена' };
    }

    await priceRecord.destroy();
    return { success: true, message: 'Запись о цене удалена' };
  } catch (error) {
    console.error('Ошибка удаления записи о цене:', error);
    return { success: false, error: 'Не удалось удалить запись о цене' };
  }
};

module.exports = { addProductPrice, getProductPrices, updateProductPrice, deleteProductPrice };
