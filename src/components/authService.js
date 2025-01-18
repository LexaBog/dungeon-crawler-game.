import axios from "axios";


export const authenticateUser = async (telegramId, username) => {
  try {
    const response = await axios.post("http://localhost:5021/api/auth", { telegramId, username });
    return response.data.user; // Возвращаем данные пользователя
  } catch (error) {
    console.error("Ошибка авторизации:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchCharacter = async (telegramId) => {
  try {
    const response = await axios.post("http://localhost:5021/api/characters", { telegramId });
    return response.data; // Возвращаем данные персонажа
  } catch (error) {
    console.error("Ошибка при запросе персонажа:", error.response?.data || error.message);
    throw error;
  }
};

// Функция для получения токена из localStorage
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};
