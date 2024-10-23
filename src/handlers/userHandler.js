const userController = require('../controllers/userController');

const handleUserCommands = async (ws, method, valueData, requestId) => {
  switch (method) {
    case 'AddUser':
      const { name, email } = valueData;
      if (!name || !email) {
        ws.send(JSON.stringify({ error: 'Необходимо указать имя и email', requestId }));
        return;
      }
      const addedUser = await userController.addUser(name, email);
      ws.send(JSON.stringify({ ...addedUser, requestId }));
      break;

    case 'GetUsers':
      const users = await userController.getUsers();
      ws.send(JSON.stringify({ ...users, requestId }));
      break;

    case 'DeleteUser':
      const { id } = valueData;
      const deletedUser = await userController.deleteUser(id);
      ws.send(JSON.stringify({ ...deletedUser, requestId }));
      break;

    default:
      ws.send(JSON.stringify({ error: 'Неизвестный метод для пользователей', requestId }));
  }
};

module.exports = { handleUserCommands };
