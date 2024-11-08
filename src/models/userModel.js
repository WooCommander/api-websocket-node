const { DataTypes } = require('sequelize');
const { genSalt, hash, compare } = require('bcrypt');
const { define: defineModel } = require('../config/db.mjs').default;

const User = defineModel('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Хэширование пароля перед сохранением
User.beforeCreate(async (user) => {
  const salt = await genSalt(10);
  user.password = await hash(user.password, salt);
});

// Проверка пароля при логине
User.prototype.checkPassword = async function (password) {
  return await compare(password, this.password);
};

module.exports = User;
