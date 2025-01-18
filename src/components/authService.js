import axios from "axios";

// Авторизация пользователя
export const authenticateUser = async (telegramId, username) => {
  try {
    // const user = await authenticateUser(telegramId, username);

    // const response = await axios.post("https://dangeon-db-beck.onrender.com/api/auth", { telegramId, username });
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
    // const response = await axios.post("https://dangeon-db-beck.onrender.com/api/characters", { telegramId });
    const response = await axios.post("http://localhost:5021/api/characters", { telegramId });
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе персонажа:", error.response?.data || error.message);
    throw error;
  }
};
