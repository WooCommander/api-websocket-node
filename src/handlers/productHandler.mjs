import { addProduct, getProducts, deleteProduct } from '../controllers/productController.mjs';
import '../services/sessionService.mjs';


const handleProductCommands = async (ws, method, valueData, _Token, requestId) => {

  switch (method) {
    case 'AddProduct':
      const { name, price } = valueData;
      if (!name || !price) {
        ws.send(JSON.stringify({ error: 'Необходимо указать название и цену', requestId }));
        return;
      }
      const addedProduct = await addProduct(name, price);
      ws.send(JSON.stringify({ ...addedProduct, requestId }));
      break;

    case 'GetProducts':
      const products = await getProducts();
      ws.send(JSON.stringify({ ...products, requestId }));
      break;

    case 'DeleteProduct':
      const { id } = valueData;
      const deletedProduct = await deleteProduct(id);
      ws.send(JSON.stringify({ ...deletedProduct, requestId }));
      break;

    default:
      ws.send(JSON.stringify({ error: 'Неизвестный метод для товаров', requestId }));
  }
}


export { handleProductCommands };
