import { validateToken } from '../services/sessionService.mjs';

// Middleware для проверки JWT токена
const authenticateToken = (ws, Token, next) => {
  
  if (!Token) {
    ws.send(JSON.stringify({ error: 'Токен отсутствует' }));
    return;
  }
  const user = validateToken(Token)
  if (!user) {
    ws.send(JSON.stringify({ error: 'Недействительный токен' }));
    return;
  }
  ws.user = user;
  next();
  ;
};

export default authenticateToken;
