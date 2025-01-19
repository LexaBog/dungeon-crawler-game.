import axios from "axios";

// Функция для проверки токена
export const validateToken = async (token) => {
  try {
    const response = await axios.post("http://localhost:5021/api/validate-token", { token });
    console.log("Ответ от сервера:", response.data.data, token);

    const { telegramId, username } = response.data.data;
    console.log("Проверка данных перед возвратом:", { telegramId, username });

    return { telegramId, username }; // Возвращаем объект с telegramId и username
  } catch (error) {
    console.error("Ошибка при валидации токена:", error.response?.data || error.message);
    throw error; // Пробрасываем ошибку
  }
};




// Авторизация пользователя
export const authenticateUser = async (telegramId, username) => {
  try {
    const response = await axios.post("http://localhost:5021/api/auth", { telegramId, username });
    console.log("Данные пользователя:", response.data.user);
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





// Используйте токен из URL
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

if (token) {
  validateToken(token);
}
