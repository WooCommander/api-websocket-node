const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const { handleProductCommands } = require('./handlers/productHandler');
const { handleUserCommands } = require('./handlers/userHandler');
const authenticateToken = require('./middlewares/authMiddleware');
const { handleAuthMethods } = require('./handlers/authHandler');
const { validateToken } = require('./services/sessionService');
const handleMessage = async (ws, message) => {

  try {
    const parsedMessage = JSON.parse(message);
   
    const { Controller, Method, Token, Value, RequestId } = parsedMessage;
    const valueData = Value ? JSON.parse(Value) : {};
    
    console.log("Token",Token);

    // Проверка токена для всех команд, кроме логина
    if (Method !== 'Login' && Method !== 'Register' && !validateToken(Token)) {
      ws.send(JSON.stringify({ error: 'Токен недействителен или отсутствует', requestId: RequestId }));
      return;
    }

    switch (Controller) {
      case 'AuthController':
        await handleAuthMethods(ws, Method, valueData, Token, RequestId);
        break;
      case 'UserController':
        authenticateToken(ws, Token, async () => {
          await handleUserCommands(ws, Method, valueData, Token, RequestId);
        })
        break;

      case 'ProductController':
        authenticateToken(ws, Token, async () => {
          await handleProductCommands(ws, Method, valueData, Token, RequestId);
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
      requestId: null
    }));
  }
};

module.exports = { handleMessage };