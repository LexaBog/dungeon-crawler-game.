import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CharacterInfo from "./components/CharacterInfo.js";
import Game from "./components/Game.js";
import Header from "./components/Header.js";
import DungeonList from "./components/dangeons/Dangeon.js";
import NavigationButtons from "./components/navigationButtons/NavigationButtons .js"
import { authenticateUser, validateToken } from "./components/authService.js";
import "./App.css";

function App() {
  const [telegramId, setTelegramId] = useState(null);
  const [username, setUsername] = useState(null);
  const [characterId, setCharacterId] = useState(null);
  const [error, setError] = useState(null);
  // const [telegramId, setTelegramId] = useState("123456789"); // Статичный Telegram ID
  // const [username, setUsername] = useState("TestUser"); // Статичное имя пользователя
  // const [characterId, setCharacterId] = useState({
  //   name: "Test Character",
  //   level: 1,
  //   experience: 100,
  //   health: 50,
  //   maxHealth: 100,
  //   mana: 30,
  //   maxMana: 30,
  // });

  useEffect(() => {
    // Получение токена из URL или localStorage
    const storedToken = localStorage.getItem("token");
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token") || storedToken;

    if (!token) {
      setError("Токен отсутствует. Перейдите по ссылке от бота.");
      return;
    }

    // Сохраняем токен в localStorage, если он пришёл из URL
    if (!storedToken && token) {
      localStorage.setItem("token", token);
    }

    // Валидация токена
    validateToken(token)
      .then(({ telegramId, username }) => {
        setTelegramId(telegramId);
        setUsername(username);

        // Авторизация пользователя
        return authenticateUser(telegramId, username);
      })
      .then((user) => {
        setCharacterId(user.characterId); // Сохраняем characterId для использования
      })
      .catch((err) => {
        console.error("Ошибка авторизации:", err);
        setError("Не удалось авторизовать пользователя.");
      });
  }, []); // Пустой массив зависимостей

  // Отображение ошибок или загрузки
  if (error) return <p>{error}</p>;
  if (!telegramId || !username) return <p>Загрузка...</p>;

  return (
    <div className="ollGameBody">
      {/* <div className="header">
        <h1 className="headerText">Dungeons s Heroes</h1>
      </div> */}

        <Header
          characterId={characterId}
        />
      <Routes>
        <Route
        path="/dangeon"
          element={
            <DungeonList
            telegramId={telegramId}
            />
          }
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
        <NavigationButtons/>
      </div>
    </div>
  );
}

export default App;
