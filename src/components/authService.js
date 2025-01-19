import axios from "axios";

// Авторизация пользователя
export const authenticateUser = async (telegramId, username, host) => {
  try {
    // const user = await authenticateUser(telegramId, username);

    // const response = await axios.post("${host}/api/auth", { telegramId, username });
    const response = await axios.post("http://localhost:5021/api/auth", { telegramId, username });
    console.log("Данные пользователя:", username);
    return response.data.user;
  } catch (error) {
    console.error("Ошибка авторизации:", error.response?.data || error.message);
    throw error;
  }
};

// Получение данных персонажа
export const fetchCharacter = async (telegramId) => {
  try {
    // const response = await axios.post("${host}/api/characters", { telegramId });
    const response = await axios.post("http://localhost:5021/api/characters", { telegramId });
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе персонажа:", error.response?.data || error.message);
    throw error;
  }
};

const validateToken = async (token) => {
  try {
    const response = await axios.post('http://localhost:5021/api/validate-token', { token });
    // const response = await axios.post("${host}/api/validate-token", { token });
    console.log('Ответ от сервера:', response.data);
    return response.data;
  } catch (error) {
    console.error('Ошибка при валидации токена:', error.response?.data || error.message);
  }
};

// Используйте токен из URL
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

if (token) {
  validateToken(token);
}
