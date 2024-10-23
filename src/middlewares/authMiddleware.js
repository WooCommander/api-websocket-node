const jwt = require('jsonwebtoken');

// Middleware для проверки JWT токена
const authenticateToken = (ws, message, next) => {
  const parsedMessage = JSON.parse(message);
  const token = parsedMessage.Token;

  if (!token) {
    ws.send(JSON.stringify({ error: 'Токен отсутствует' }));
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      ws.send(JSON.stringify({ error: 'Недействительный токен' }));
      return;
    }
    ws.user = user;
    next();
  });
};

module.exports = authenticateToken;
