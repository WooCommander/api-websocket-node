const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const { handleProductCommands } = require('./handlers/productHandler');
const { handleUserCommands } = require('./handlers/userHandler');
const authenticateToken = require('./middlewares/authMiddleware');
const { handleAuthCommands } = require('./handlers/authHandler');

const handleMessage = async (ws, message) => {
  try {
    const parsedMessage = JSON.parse(message);
    const { Controller, Method, Value, RequestId } = parsedMessage;

    const valueData = Value ? JSON.parse(Value) : {};

    switch (Controller) {
      case 'AuthController':
        await handleAuthCommands(ws, Method, valueData, RequestId);
        break;
      case 'UserController':
        authenticateToken(ws, method, async () => {
          await handleUserCommands(ws, Method, valueData, RequestId);
        })
        break;

      case 'ProductController':
        authenticateToken(ws, method, async () => {
          await handleProductCommands(ws, Method, valueData, RequestId);
        })
        break;

      default:
        ws.send(JSON.stringify({
          error: 'Неизвестный контроллер',
          requestId: RequestId
        }));
    }
  } catch (error) {
    console.error('Ошибка при обработке сообщения:', error);
    ws.send(JSON.stringify({
      error: 'Ошибка сервера',
      requestId: parsedMessage.RequestId || null
    }));
  }
};

module.exports = { handleMessage };