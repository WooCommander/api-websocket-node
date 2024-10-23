const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class AuthController {
    // Регистрация пользователя
    async register(name, email, password) {
        try {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return { success: false, error: 'Email уже используется' };
            }

            const newUser = await User.create({ name, email, password });
            return { success: true, user: newUser };
        } catch (error) {
            console.error('Ошибка регистрации:', error);
            return { success: false, error: 'Ошибка регистрации' };
        }
    };

    // Авторизация пользователя
    async login(email, password) {
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return { success: false, error: 'Неправильный email или пароль' };
            }

            const isPasswordValid = await user.checkPassword(password);
            if (!isPasswordValid) {
                return { success: false, error: 'Неправильный email или пароль' };
            }

            // Создание JWT токена
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            return { success: true, token, user };
        } catch (error) {
            console.error('Ошибка авторизации:', error);
            return { success: false, error: 'Ошибка авторизации' };
        }
    };
}
module.exports = { AuthController };
