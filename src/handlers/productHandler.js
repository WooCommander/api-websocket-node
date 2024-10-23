const productController = require('../controllers/productController');

const handleProductCommands  = async (ws, method, valueData, requestId) => {
  switch (method) {
    case 'AddProduct':
      const { name, price } = valueData;
      if (!name || !price) {
        ws.send(JSON.stringify({ error: 'Необходимо указать название и цену', requestId }));
        return;
      }
      const addedProduct = await productController.addProduct(name, price);
      ws.send(JSON.stringify({ ...addedProduct, requestId }));
      break;

    case 'GetProducts':
      const products = await productController.getProducts();
      ws.send(JSON.stringify({ ...products, requestId }));
      break;

    case 'DeleteProduct':
      const { id } = valueData;
      const deletedProduct = await productController.deleteProduct(id);
      ws.send(JSON.stringify({ ...deletedProduct, requestId }));
      break;

    default:
      ws.send(JSON.stringify({ error: 'Неизвестный метод для товаров', requestId }));
  }
};

module.exports = { handleProductCommands };
