const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const sessionService = require('../services/sessionService');

class AuthController {
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
    // Авторизация пользователя с сохранением токена
    async login(email, password, clientToken) {
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return { success: false, error: 'Неправильный email или пароль' };
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return { success: false, error: 'Неправильный email или пароль' };
            }

            // Сохраняем токен клиента и связываем его с пользователем
            sessionService.addToken(clientToken, user.id);

            return { success: true, user };
        } catch (error) {
            console.error('Ошибка авторизации:', error);
            return { success: false, error: 'Ошибка авторизации' };
        }
    };

    // Получение информации об авторизованном пользователе
    async getUserInfo (token){
        const userId = sessionService.validateToken(token);
        if (!userId) {
            return { success: false, user: null, error: 'Пользователь не авторизован' };
        }

        const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
        return { success: true, user };
    };
}
module.exports = { AuthController };
