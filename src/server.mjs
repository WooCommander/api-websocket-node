import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/db.mjs'; // Убедитесь, что путь и расширение файла правильные

dotenv.config();

import ws from 'ws';
import { handleMessage } from './dispatcher.mjs'; // Убедитесь, что путь и расширение файла правильные

sequelize.sync({ force: false })
    .then(() => {
        console.log('Таблицы синхронизированы');
    })
    .catch((error) => {
        console.error('Ошибка синхронизации таблиц:', error);
    });

const app = express();
const PORT = process.env.PORT || 3000;

const newLocal = new ws.Server({ port: process.env.PORT || 8080 });
const wss = newLocal;

wss.on('connection', (ws) => {
    console.log('Новое WebSocket соединение');

    ws.on('message', (message) => {
        handleMessage(ws, message);
    });

    ws.on('close', () => {
        console.log('Соединение закрыто');
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log(`WebSocket сервер запущен на порту ${process.env.PORT || 8080}`);
