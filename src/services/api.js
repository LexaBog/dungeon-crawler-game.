import axios from "axios";

// URL вашего API
const API_URL = "http://localhost:5000/api"; // Замените на реальный URL вашего сервера

// Получение данных игрока по userId
export const fetchPlayerData = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/player/${userId}`);
    return response.data; // Возвращаем данные игрока
  } catch (error) {
    console.error("Ошибка при получении данных игрока:", error);
    return null; // Возвращаем null в случае ошибки
  }
};

// Создание нового игрока
export const createNewPlayer = async (name) => {
  try {
    const response = await axios.post(`${API_URL}/player`, { name });
    return response.data; // Возвращаем данные нового игрока
  } catch (error) {
    console.error("Ошибка при создании нового игрока:", error);
    return null; // Возвращаем null в случае ошибки
  }
};

// Обновление данных игрока
export const updatePlayerData = async (player) => {
  try {
    const response = await axios.put(`${API_URL}/player`, player);
    console.log("Player updated:", response.data);
    return response.data; // Возвращаем данные от сервера
  } catch (error) {
    console.error("Ошибка при обновлении данных игрока:", error);
    return null; // Возвращаем null в случае ошибки
  }
};
