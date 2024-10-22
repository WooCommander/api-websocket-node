const productController = require('../controllers/productController');

const handleProductCommands = async (ws, type, payload) => {
  switch (type) {
    case 'addProduct':
      const { name, price } = payload;
      if (!name || !price) {
        ws.send(JSON.stringify({ error: 'Необходимо указать название и цену' }));
        return;
      }
      const addedProduct = await productController.addProduct(name, price);
      ws.send(JSON.stringify(addedProduct));
      break;

    case 'getProducts':
      const products = await productController.getProducts();
      ws.send(JSON.stringify(products));
      break;

    case 'deleteProduct':
      const { id } = payload;
      const deletedProduct = await productController.deleteProduct(id);
      ws.send(JSON.stringify(deletedProduct));
      break;

    default:
      ws.send(JSON.stringify({ error: 'Неизвестная команда для товаров' }));
  }
};

module.exports = { handleProductCommands };
