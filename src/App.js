import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios'; // Импортируем axios
import PlayerStats from './components/PlayerStats.tsx';
import HeroModel2d from './components/HeroModel2d';
import Dungeon from './components/Dungen';
import './App.css';

const API_URL = "https://your-backend-url/api"; // Укажи URL своего API

function App() {
  const [player, setPlayer] = useState(() => {
    const storedUserId = localStorage.getItem("userId"); // Загружаем только userId из localStorage
    return {
      userId: storedUserId || null, // Если userId нет, устанавливаем null
      name: null, // Остальные данные будут загружены из базы
      xp: null,
      armor: null,
      damage: null,
      level: null,
      gold: null,
      power: null,
    };
  });

  useEffect(() => {
    const fetchOrCreatePlayer = async () => {
      try {
        if (player.userId) {
          // Если userId есть, загружаем данные игрока с сервера
          const response = await axios.get(`${API_URL}/player/${player.userId}`);
          if (response.data) {
            setPlayer(response.data); // Обновляем данные игрока
          } else {
            console.error("Player not found in the database.");
          }
        } else {
          // Если userId нет, создаём нового игрока
          const urlParams = new URLSearchParams(window.location.search);
          const username = urlParams.get("username") || "Unknown Player"; // Имя из URL
          const response = await axios.post(`${API_URL}/player`, { name: username });
          if (response.data?.userId) {
            localStorage.setItem("userId", response.data.userId); // Сохраняем userId в localStorage
            setPlayer(response.data); // Устанавливаем данные нового игрока
          } else {
            console.error("Failed to create a new player.");
          }
        }
      } catch (error) {
        console.error("Error syncing player data:", error);
      }
    };

    fetchOrCreatePlayer();
  }, [player.userId]);

  return (
    <div className="ollGameBody">
      <nav>
        <Link to="/:username">Главная</Link>
        <Link to="/dungeons">Данжи</Link>
      </nav>

      <Routes>
        <Route
           path="/:username"
          element={
            <div>
              <h1>Главная страница</h1>
              <PlayerStats player={player} onPlayerUpdate={setPlayer} />
              <HeroModel2d onPlayerUpdate={setPlayer} />
            </div>
          }
        />
        <Route
          path="/dungeons"
          element={<Dungeon player={player} onPlayerUpdate={setPlayer} />}
        />
      </Routes>
    </div>
  );
}

export default App;
