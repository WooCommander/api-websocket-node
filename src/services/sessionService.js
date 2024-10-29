const { v4: uuidv4 } = require('uuid');

const sessionTokens = {};

// Время хранения токена в миллисекундах (например, 30 минут)
const TOKEN_EXPIRATION_TIME = 30 * 60 * 1000;

// Функция для получения или создания токена
const getOrCreateToken = (userId) => {
  // Проверяем, есть ли токен для данного пользователя
  const existingToken = Object.keys(sessionTokens).find(token => sessionTokens[token].userId === userId);
  if (existingToken) {
    return existingToken;
  }

  // Если токен не найден, создаем новый
  const newToken = uuidv4();
  addToken(newToken, userId);
  return newToken;
};

// Добавление токена с временной меткой
const addToken = (token, userId) => {
  sessionTokens[token] = { userId, lastActivity: Date.now() };
};

// Проверка токена и обновление времени активности
const validateToken = (token) => {
    console.log("sessionTokens", sessionTokens);
    
  const session = sessionTokens[token];
  
  if (!session) return null;

  // Проверяем срок действия токена
  if (Date.now() - session.lastActivity > TOKEN_EXPIRATION_TIME) {
    delete sessionTokens[token];
    return null;
  }

  // Обновляем время последней активности
  session.lastActivity = Date.now();
  return session.userId;
};

// Удаление токена
const removeToken = (token) => {
  delete sessionTokens[token];
};

// Удаление просроченных токенов
const clearExpiredTokens = () => {
  const now = Date.now();
  for (const token in sessionTokens) {
    if (now - sessionTokens[token].lastActivity > TOKEN_EXPIRATION_TIME) {
      delete sessionTokens[token];
    }
  }
};

// Запуск очистки просроченных токенов каждые 5 минут
setInterval(clearExpiredTokens, 5 * 60 * 1000);

module.exports = { getOrCreateToken, addToken, validateToken, removeToken };
