import axios from "axios";

// Функция для авторизации пользователя и получения токенов
// export const authenticateUser = async () => {
//   try {
//     const response = await axios.post("http://localhost:5021/api/auth", {});
//     const { accessToken, refreshToken } = response.data.tokens;

//     // Сохраняем токены в localStorage
//     localStorage.setItem("accessToken", accessToken);
//     localStorage.setItem("refreshToken", refreshToken);

//     console.log("Токены успешно сохранены:", { accessToken, refreshToken });

//     return response.data.user; // Возвращаем данные пользователя
//   } catch (error) {
//     console.error("Ошибка авторизации:", error.response?.data || error.message);
//     throw error;
//   }
// };

// Функция для авторизации пользователя и получения данных
export const authenticateUser = async (telegramId, username) => {
  try {
    if (!telegramId || !username) {
      throw new Error("telegramId или username не переданы");
    }

    const response = await axios.post("http://localhost:5021/api/auth", { telegramId, username });

    console.log("Данные пользователя:", response.data.user);

    return response.data.user; // Возвращаем данные пользователя
  } catch (error) {
    console.error("Ошибка авторизации:", error.response?.data || error.message);
    throw error;
  }
};


// Функция для получения токена из localStorage
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

// Функция для запроса данных персонажа
export const fetchCharacter = async () => {
  const token = getAccessToken(); // Получаем токен из localStorage

  if (!token) {
    throw new Error("Токен не найден. Пожалуйста, авторизуйтесь.");
  }

  try {
    const response = await axios.get("http://localhost:5021/api/characters", {
      headers: {
        Authorization: `Bearer ${token}`, // Передаем токен в заголовке
      },
    });

    console.log("Ответ сервера с данными персонажа:", response.data);
    return response.data; // Возвращаем данные персонажа
  } catch (error) {
    console.error("Ошибка при запросе персонажа:", error.response?.data || error.message);
    throw error;
  }
};
