import User from "../models/userModel.mjs";

// Добавление пользователя
const addUser = async (name, email) => {
  try {
    const newUser = await User.create({ name, email });
    return { success: true, user: newUser };
  } catch (error) {
    console.error('Ошибка добавления пользователя:', error);
    return { success: false, error: 'Не удалось добавить пользователя' };
  }
};

// Получение списка пользователей
const getUsers = async () => {
  try {
    const users = await User.findAll();
    return { success: true, users };
  } catch (error) {
    console.error('Ошибка получения списка пользователей:', error);
    return { success: false, error: 'Не удалось получить список пользователей' };
  }
};

// Удаление пользователя
const deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return { success: false, error: 'Пользователь не найден' };
    }
    await user.destroy();
    return { success: true, message: 'Пользователь удалён' };
  } catch (error) {
    console.error('Ошибка удаления пользователя:', error);
    return { success: false, error: 'Не удалось удалить пользователя' };
  }
};

export { addUser, getUsers, deleteUser };
