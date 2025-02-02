// src/App.js
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CharacterInfo from "./components/CharacterInfo";
import Game from "./components/Game";
import Header from "./components/Header";
import DungeonList from "./components/dangeons/Dangeon";
import NavigationButtons from "./components/navigationButtons/NavigationButtons ";
import { authenticateUser, validateToken } from "./components/authService";
import "./App.css";
import config from "./config";
import axios from "axios";

export const fetchCharacter = async (telegramId) => {
  try {
    const response = await axios.get(`${config.apiUrl}/api/character/${telegramId}`);
    return response.data;
  } catch (err) {
    console.error("Ошибка загрузки персонажа:", err.response?.data || err.message);
    throw new Error("Не удалось загрузить данные о персонаже");
  }
};

function App() {
  // Используем данные из конфига (если mode === "local", то будут заданы жестко)
  const [telegramId, setTelegramId] = useState(config.telegramId);
  const [username, setUsername] = useState(config.username);
  const [characterId, setCharacterId] = useState(null);
  const [error, setError] = useState(null);
  const [characterData, setCharacterData] = useState(null);

  // Пример получения данных персонажа (это можно объединить с логикой авторизации)
  useEffect(() => {
    const loadCharacter = async () => {
      try {
        setError(null);
        const data = await fetchCharacter(telegramId);
        setCharacterData(data);
        setCharacterId(data); // если требуется
      } catch (err) {
        setError("Не удалось загрузить данные о персонаже");
      }
    };

    // Если в режиме local данные уже заданы, можно сразу загружать персонажа,
    // а если в production, то сначала нужно дождаться валидации токена
    if (telegramId) {
      loadCharacter();
    }
  }, [telegramId]);

  // Если в production, раскомментируйте этот блок:
  /*
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token") || storedToken;

    if (!token) {
      setError("Токен отсутствует. Перейдите по ссылке от бота.");
      return;
    }

    if (!storedToken && token) {
      localStorage.setItem("token", token);
    }

    validateToken(token)
      .then(({ telegramId, username }) => {
        setTelegramId(telegramId);
        setUsername(username);
        return authenticateUser(telegramId, username);
      })
      .then((user) => {
        setCharacterId(user.characterId);
      })
      .catch((err) => {
        setError("Не удалось авторизовать пользователя.");
      });
  }, []);
  */

  if (error) return <p>{error}</p>;
  if (!telegramId || !username) return <p>Загрузка...</p>;

  return (
    <div className="ollGameBody">
      <Header characterId={characterId} />
      <Routes>
        <Route
          path="/dangeon"
          element={<DungeonList telegramId={telegramId} />}
        />
        <Route
          path="/character"
          element={
            <CharacterInfo
              telegramId={telegramId}
              username={username}
              characterId={characterId}
              setCharacterId={setCharacterId}
            />
          }
        />
        <Route
          path="/"
          element={
            <Game
              telegramId={telegramId}
              username={username}
              characterId={characterId}
              setCharacterId={setCharacterId}
            />
          }
        />
      </Routes>
      <div className="futer">
        <NavigationButtons />
      </div>
    </div>
  );
}

export default App;
