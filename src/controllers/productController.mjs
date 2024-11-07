import Product from '../models/productModel.mjs';
import ProductGroup from '../models/productGroupModel.mjs';
import ProductPrice from '../models/productPriceModel.mjs';

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

// Получение списка товаров с пагинацией
const getProducts = async (page = 1, pageSize = 10) => {
  try {
    const offset = (page - 1) * pageSize;
    const products = await Product.findAndCountAll({
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
      limit: pageSize,
      offset: offset,
    });

    return { 
      success: true, 
      products: products.rows, 
      total: products.count, 
      totalPages: Math.ceil(products.count / pageSize) 
    };
  } catch (error) {
    console.error('Ошибка получения списка товаров:', error);
    return { success: false, error: 'Не удалось получить список товаров' };
  }
};

// Получение товара по ID с информацией о группе и последней ценой
const getProductById = async (id) => {
  if (!id) {
    return { success: false, error: 'ID товара обязателен' };
  }

  try {
    const product = await Product.findByPk(id, {
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

    if (!product) {
      return { success: false, error: 'Товар не найден' };
    }

    return { success: true, product };
  } catch (error) {
    console.error('Ошибка получения товара:', error);
    return { success: false, error: 'Не удалось получить товар' };
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

// Обновление цены товара
const updateProductPrice = async (productId, newPrice) => {
  if (!productId || newPrice === undefined) {
    return { success: false, error: 'ID товара и новая цена обязательны' };
  }

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return { success: false, error: 'Товар не найден' };
    }

    await ProductPrice.create({
      productId: product.id,
      price: newPrice,
      quantity: 1,
      dateRegister: new Date(),
    });

    return { success: true, message: 'Цена товара обновлена' };
  } catch (error) {
    console.error('Ошибка обновления цены товара:', error);
    return { success: false, error: 'Не удалось обновить цену товара' };
  }
};

export { 
  addProduct, 
  getProducts, 
  updateProduct, 
  deleteProduct, 
  getProductById, 
  updateProductPrice, 
};
