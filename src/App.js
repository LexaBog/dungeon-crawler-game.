import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CharacterInfo from "./components/CharacterInfo.js";
import authService from "./components/authService.js"
import {fetchCharacter} from "./components/authService.js"
import axios from 'axios';
import Game from "./components/Game.js";
import "./App.css";


function App({ telegramId, username,}) {
    const [telegramId, setTelegramId] = useState(null);
    const [error, setError] = useState(null);
    
    console.log("Проверка telegramId в App:", telegramId);
  // Используем useEffect для получения токена из URL и проверки на сервере
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Вызываем validateToken и сохраняем результат
      validateToken(token)
        .then((data) => {
          if (data && data.telegramId) {
            setTelegramId(data.telegramId); // Сохраняем telegramId в состояние
          } else {
            setError("Ошибка при валидации токена. Проверьте ссылку.");
          }
        })
        .catch((err) => {
          console.error("Ошибка при валидации токена:", err);
          setError("Ошибка при валидации токена. Попробуйте позже.");
        });
    } else {
      setError("Токен отсутствует. Перейдите по ссылке от бота.");
    }
  }, []);

  if (error) return <p>{error}</p>;
  if (!telegramId) return <p>Загрузка...</p>;

    return (
        <div className="ollGameBody">
            <div className="header">
                <h1 className="headerText">Dungeons s Heroes</h1>
            </div>

            <div>
                <h2>Добро пожаловать, {character.name}!</h2>
                <p>Ваш уровень: {character.level}</p>
                {/* Отображайте остальные данные персонажа */}
            </div>

            Передача данных через маршруты
            {/* <authService takeIDfromChold={takeIDfromChold}/> */}
            <Routes>
                <Route
                    path="/"
                    element={
                        <CharacterInfo
                            telegramId={telegramId} username={username}
                        />
                    }
                />
                <Route
                    path="/game"
                    element={<Game character={character} />}
                />
            </Routes>

            <div className="futer"></div>
        </div>
    );
}

export default App;
