import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CharacterInfo from "./components/CharacterInfo.js";
import Game from "./components/Game.js";
import { authenticateUser, validateToken,} from "./components/authService.js";
import "./App.css";

function App() {
  const [telegramId, setTelegramId] = useState(null);
  const [username, setUsername] = useState(null);
  const [characterId, setCharacterId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    // console.log("Токен из URL:", token);

    if (!token) {
      setError("Токен отсутствует. Перейдите по ссылке от бота.");
      return;
    }

    // Валидация токена
    validateToken(token)
      .then(({ telegramId, username }) => {
        // console.log("Валидный токен. Данные пользователя:", { telegramId, username });
        setTelegramId(telegramId);
        setUsername(username);

        // Авторизация пользователя
        return authenticateUser(telegramId, username);
      })
      .then((user) => {
        // console.log("Пользователь успешно авторизован:", user);
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
      <div className="header">
        <h1 className="headerText">Dungeons s Heroes</h1>
      </div>

      <Routes>
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

      <div className="futer"></div>
    </div>
  );
}

export default App;
