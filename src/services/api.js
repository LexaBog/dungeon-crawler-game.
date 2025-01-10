// api.js
import axios from "axios";


const API_URL = "http://localhost:5000/api";  // или путь к твоему API

// Функция для получения списка игроков
export const fetchPlayers = async () => {
  try {
    const response = await axios.get(`${API_URL}/players`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при загрузке игроков:", error);
    return [];
  }
};

// Функция для добавления нового игрока
export const updatePlayerData = async (player) => {
  try {

    console.log("Sending data to server:", {
      Id: String(player.id), // Проверяем, что передаётся строка
      ...player,
    })

    const response = await axios.put("http://localhost:5000/api/player", player);
    console.log("Player updated:", response.data);
    return response.data; // Возвращаем данные от сервера, включая userId
  } catch (error) {
    console.error("Error updating player:", error);
    return null; // Возвращаем null, если ошибка
  }

  
    // console.log("Response from server:", response.data);
  
};
