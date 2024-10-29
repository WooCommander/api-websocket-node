const { AuthController } = require("../controllers/authController");

const authController = new AuthController()
// Авторизация пользователя
const handleAuthMethods = async (ws, method, valueData, clientToken, requestId) => {
    switch (method) {
        case 'Register':
            const { name, email, password } = valueData;
            const registrationResult = await authController.register(name, email, password);
            ws.send(JSON.stringify({ ...registrationResult, requestId }));
            break;

        case 'Login':
            const { email: loginEmail, password: loginPassword } = valueData;
            const loginResult = await authController.login(loginEmail, loginPassword, clientToken);
            ws.send(JSON.stringify({ ...loginResult, requestId }));
            break;
        case 'GetUserInfo':
            const userInfo = await authController.getUserInfo(clientToken);
            ws.send(JSON.stringify({ ...userInfo, requestId }));
            break;
        default:
            ws.send(JSON.stringify({ error: 'Неизвестный метод для авторизации', requestId }));
    }
};
module.exports = { handleAuthMethods }
