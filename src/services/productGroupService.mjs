import { create, findAll, findByPk } from '../models/productGroupModel.mjs';

// Добавление новой группы
const addProductGroup = async (name) => {
  if (!name) {
    return { success: false, error: 'Имя группы обязательно' };
  }

  try {
    const newGroup = await create({ name });
    return { success: true, group: newGroup };
  } catch (error) {
    console.error('Ошибка добавления группы:', error);
    return { success: false, error: 'Не удалось добавить группу' };
  }
};

// Получение списка групп
const getProductGroups = async () => {
  try {
    const groups = await findAll();
    return { success: true, groups };
  } catch (error) {
    console.error('Ошибка получения списка групп:', error);
    return { success: false, error: 'Не удалось получить список групп' };
  }
};

// Изменение группы
const updateProductGroup = async (id, name) => {
  if (!id || !name) {
    return { success: false, error: 'ID группы и новое имя обязательны' };
  }

  try {
    const group = await findByPk(id);
    if (!group) {
      return { success: false, error: 'Группа не найдена' };
    }

    group.name = name;
    await group.save();
    return { success: true, group };
  } catch (error) {
    console.error('Ошибка изменения группы:', error);
    return { success: false, error: 'Не удалось изменить группу' };
  }
};

// Удаление группы
const deleteProductGroup = async (id) => {
  if (!id) {
    return { success: false, error: 'ID группы обязателен' };
  }

  try {
    const group = await findByPk(id);
    if (!group) {
      return { success: false, error: 'Группа не найдена' };
    }

    await group.destroy();
    return { success: true, message: 'Группа удалена' };
  } catch (error) {
    console.error('Ошибка удаления группы:', error);
    return { success: false, error: 'Не удалось удалить группу' };
  }
};

export default { addProductGroup, getProductGroups, updateProductGroup, deleteProductGroup };
