import React, { useState } from 'react';
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
      <PlayerStats player={player} onPlayerUpdate={setPlayer} />
      <HeroModel2d onPlayerUpdate={setPlayer} />
      <Dungeon player={player} onPlayerUpdate={setPlayer} />
    </div>
  );
}

export default App;
