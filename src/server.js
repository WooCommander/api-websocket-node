const WebSocket = require('ws');
const sequelize = require('./config/db');
const User = require('./models/userModel');

const { handleMessage } = require('./dispatcher');
sequelize.sync({ force: false })
    .then(() => {
        console.log('Таблицы синхронизированы');
    })
    .catch((error) => {
        console.error('Ошибка синхронизации таблиц:', error);
    });
const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });

wss.on('connection', (ws) => {
    console.log('Новое WebSocket соединение');

    ws.on('message', (message) => {
        handleMessage(ws, message);
    });

    ws.on('close', () => {
        console.log('Соединение закрыто');
    });
});

console.log(`WebSocket сервер запущен на порту ${process.env.PORT || 8080}`);
