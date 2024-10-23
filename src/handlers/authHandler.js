const { AuthController } = require("../controllers/authController");

const authController =new AuthController()
// Авторизация пользователя
const handleAuthCommands = async (ws, method, valueData, requestId) => {
    switch (method) {
        case 'Register':
            const { name, email, password } = valueData;
            const registrationResult = await authController.register(name, email, password);
            ws.send(JSON.stringify({ ...registrationResult, requestId }));
            break;

        case 'Login':
            const { email: loginEmail, password: loginPassword } = valueData;
            const loginResult = await authController.login(loginEmail, loginPassword);
            ws.send(JSON.stringify({ ...loginResult, requestId }));
            break;

        default:
            ws.send(JSON.stringify({ error: 'Неизвестный метод для авторизации', requestId }));
    }
};
module.exports = { handleAuthCommands }
