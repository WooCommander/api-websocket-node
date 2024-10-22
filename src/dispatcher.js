const { handleUserCommands } = require('./handlers/userHandler');
const { handleProductCommands } = require('./handlers/productHandler');

const handleMessage = async (ws, message) => {
  try {
    const parsedMessage = JSON.parse(message);
    const { entity, type, payload } = parsedMessage;

    switch (entity) {
      case 'user':
        await handleUserCommands(ws, type, payload);
        break;

      case 'product':
        await handleProductCommands(ws, type, payload);
        break;

      default:
        ws.send(JSON.stringify({ error: 'Неизвестная сущность' }));
    }
  } catch (error) {
    console.error('Ошибка при обработке сообщения:', error);
    ws.send(JSON.stringify({ error: 'Ошибка сервера' }));
  }
};

module.exports = { handleMessage };
