const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
  host: process.env.PG_HOST,
  dialect: 'postgres',
  port: process.env.PG_PORT,
});

sequelize.authenticate()
  .then(() => {
    console.log('Подключение к базе данных PostgreSQL установлено');
  })
  .catch((err) => {
    console.error('Ошибка подключения к базе данных:', err);
  });

module.exports = sequelize;