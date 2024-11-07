import { addUser, getUsers, deleteUser } from '../controllers/userController.mjs';
import authenticateToken from '../middlewares/authMiddleware.mjs';

const handleUserCommands = async (ws, method, valueData, requestId) => {
  authenticateToken(ws, JSON.stringify({ Token: ws.token }), async () => {
    switch (method) {
      case 'AddUser':
        const { name, email } = valueData;
        if (!name || !email) {
          ws.send(JSON.stringify({ error: 'Необходимо указать имя и email', requestId }));
          return;
        }
        const addedUser = await addUser(name, email);
        ws.send(JSON.stringify({ ...addedUser, requestId }));
        break;

      case 'GetUsers':
        const users = await getUsers();
        ws.send(JSON.stringify({ ...users, requestId }));
        break;

      case 'DeleteUser':
        const { id } = valueData;
        const deletedUser = await deleteUser(id);
        ws.send(JSON.stringify({ ...deletedUser, requestId }));
        break;

      default:
        ws.send(JSON.stringify({ error: 'Неизвестный метод для пользователей', requestId }));
    }
  })
};

export { handleUserCommands };
