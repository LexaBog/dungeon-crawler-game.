import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PlayerStats from './components/PlayerStats.tsx';
import HeroModel2d from './components/HeroModel2d';
import Dungeon from './components/Dungen';
import './App.css';

function App() {
  const [player, setPlayer] = useState({
    id: 1,
    name: 'Player1',
    xp: 10,
    armor: 0,
    damage: 1,
    level: 0,
    gold: 100,
    power: 0,
  });

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
