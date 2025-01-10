import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PlayerStats from './components/PlayerStats.tsx';
import HeroModel2d from './components/HeroModel2d';
import Dungeon from './components/Dungen';
import './App.css';

function App() {
  const [player, setPlayer] = useState(() => {
    // Загружаем данные из localStorage
    const savedPlayer = localStorage.getItem("player");
    return savedPlayer
      ? JSON.parse(savedPlayer)
      : {
          userId: null, // Начальное значение userId
          name: "Player1",
          xp: 0,
          armor: 0,
          damage: 1,
          level: 1,
          gold: 100,
          power: 0,
        };
  });

  useEffect(() => {
    // Сохраняем данные игрока в localStorage при их изменении
    localStorage.setItem("player", JSON.stringify(player));
  }, [player]);

  return (
    <div className="ollGameBody">
    <nav>
      <Link to="/">Главная</Link>
      <Link to="/dungeons">Данжи</Link>
    </nav>

    <Routes>
      <Route
        path="/"
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
