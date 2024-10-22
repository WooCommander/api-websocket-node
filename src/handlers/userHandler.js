const userController = require('../controllers/userController');

const handleUserCommands = async (ws, type, payload) => {
  switch (type) {
    case 'addUser':
      const { name, email } = payload;
      if (!name || !email) {
        ws.send(JSON.stringify({ error: 'Необходимо указать имя и email' }));
        return;
      }
      const addedUser = await userController.addUser(name, email);
      ws.send(JSON.stringify(addedUser));
      break;

    case 'getUsers':
      const users = await userController.getUsers();
      ws.send(JSON.stringify(users));
      break;

    case 'deleteUser':
      const { id } = payload;
      const deletedUser = await userController.deleteUser(id);
      ws.send(JSON.stringify(deletedUser));
      break;

    default:
      ws.send(JSON.stringify({ error: 'Неизвестная команда для пользователей' }));
  }
};

module.exports = { handleUserCommands };
