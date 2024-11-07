import { handleProductCommands } from './handlers/productHandler.mjs';
import { handleUserCommands } from './handlers/userHandler.mjs';
import authenticateToken from './middlewares/authMiddleware.mjs';
import { handleAuthMethods } from './handlers/authHandler.mjs';
import { validateToken } from './services/sessionService.mjs';

export const handleMessage = (ws, message) => {
    // Логика обработки сообщений
    console.log(`Получено сообщение: ${message}`);
    ws.send(`Ответ на сообщение: ${message}`);
};