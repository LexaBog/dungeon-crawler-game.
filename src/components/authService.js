import axios from "axios";

// Функция для проверки токена
export const validateToken = async (token) => {
  try {
    const response = await axios.post("http://localhost:5021/api/validate-token", { token });
    // const response = await axios.post("https://dangeon-db-beck.onrender.com/api/validate-token", { token });

    const { telegramId, username } = response.data.data;

    return { telegramId, username };
  } catch (error) {
    console.error("Ошибка при валидации токена:", error.response?.data || error.message);
    throw error;
  }
};

// Авторизация пользователя
export const authenticateUser = async (telegramId, username) => {
  try {
    const response = await axios.post("http://localhost:5021/api/auth", { telegramId, username });
    // const response = await axios.post("https://dangeon-db-beck.onrender.com/api/auth", { telegramId, username });
    return response.data.user;
    // return { telegramId: response.data.user.telegramId, username: response.data.user.username };
  } catch (error) {
    console.error("Ошибка авторизации:", error.response?.data || error.message);
    throw error; // Пробрасываем ошибку для обработки в вызывающем коде
  }
};



// Получение данных персонажа
// export const fetchCharacter = async (characterId) => {
//   try {
//     const response = await axios.post("http://localhost:5021/api/characters", { characterId  });
//     // const response = await axios.post("https://dangeon-db-beck.onrender.com/api/characters", { characterId });
//     console.log("Ответ сервера на запрос персонажа:", characterId);
//     return response.data;
//   } catch (error) {
//     console.error("Ошибка при запросе персонажа:", error.response?.data || error.message);
//     throw error;
//   }
// }

export const updateCharacter = async (telegramId, updates) => {
  try {
    const response = await axios.post("http://localhost:5021/api/characters/update", {
      telegramId,
      updates,
    });
    console.log("Персонаж успешно обновлён:", response.data.character);
    return response.data.character;
  } catch (error) {
    console.error("Ошибка при обновлении персонажа:", error.message);
    throw error;
  }
};



// Используйте токен из URL
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

if (token) {
  validateToken(token);
}
