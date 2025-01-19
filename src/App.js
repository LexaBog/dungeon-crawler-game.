import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CharacterInfo from "./components/CharacterInfo.js";
import {fetchCharacter} from "./components/authService.js"
import axios from 'axios';
import Game from "./components/Game.js";
import "./App.css";

// const host = 'https://dangeon-db-beck.onrender.com';
const host = 'http://localhost:5021'

function App({ telegramId, username,}) {
    const [character, setCharacter] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // Извлечение токена из URL
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
  
      if (token) {
        // Отправка токена на сервер для проверки
        axios.post('${host}/api/validate-token', { token })
            // .then(response => fetchCharacter(response.data.telegramId)) 
          .then((response) => {
            setCharacter(response.data.character); // Сохраняем данные персонажа
          })
          .catch((err) => {
            console.error('Ошибка при валидации токена:', err.response?.data || err.message);
            setError('Ошибка при входе в игру. Попробуйте снова.');
          });
      } else {
        setError('Токен отсутствует. Перейдите по ссылке от бота.');
      }
    }, []);
  
    if (error) return <p>{error}</p>;
    if (!character) return <p>Загрузка...</p>;
    console.log(telegramId, username)

    // const [character, setCharacter] = useState(null);

    const handleCharacterLoaded = (data) => {
        setCharacter(data); // Сохраняем данные персонажа
    };

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

            {/* Передача данных через маршруты */}
            <Routes>
                <Route
                    path="/"
                    element={
                        <CharacterInfo
                           host={host} telegramId={telegramId} username={username}
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
