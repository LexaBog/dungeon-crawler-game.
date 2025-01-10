import React, { useEffect } from 'react';
import { updatePlayerData } from "../services/api"; // Убедись, что путь корректен
import './PlayerStats.css';

const PlayerStats = ({ player, onPlayerUpdate }) => {
  // Пересчёт силы игрока
  const playerPowerCalc = () => {
    const calculatedPower = player.armor + player.damage + player.xp + player.level;
    onPlayerUpdate({ ...player, power: calculatedPower }); // Обновляем состояние
  };

  // Сохранение данных игрока на сервере
  const savePlayerData = async () => {
    const updatedData = await updatePlayerData(player); // Отправляем данные на сервер
    if (updatedData?.userId) {
      // Если сервер вернул userId, сохраняем его в состояние
      onPlayerUpdate({ ...player, userId: updatedData.userId });
    }
  };

  // Хук для обработки изменения характеристик игрока
  useEffect(() => {
    playerPowerCalc(); // Пересчитываем силу
    savePlayerData(); // Сохраняем данные на сервер
  }, [player.armor, player.damage, player.xp, player.level]);

  // Обработчик повышения уровня
  const levelUp = () => {
    onPlayerUpdate({ ...player, level: player.level + 1, xp: player.xp + 50 });
  };

  // Обработчик улучшения брони
  const increaseArmor = () => {
    onPlayerUpdate({ ...player, armor: player.armor + 5 });
  };

  return (
    <div className="playerStats">
      <h2>Player Stats</h2>
      <p><strong>Player Power:</strong> {player.power}</p>
      <p><strong>ID:</strong> {player.userId}</p>
      <p><strong>XP:</strong> {player.xp}</p>
      <p><strong>Armor:</strong> {player.armor}</p>
      <p><strong>Damage:</strong> {player.damage}</p>
      <p><strong>Level:</strong> {player.level}</p>
      <p><strong>Gold:</strong> {player.gold}</p>
      <div style={{ marginTop: '20px' }}>
        <button onClick={levelUp} style={{ marginRight: '10px', padding: '5px 10px', cursor: 'pointer' }}>
          Level Up
        </button>
        <button onClick={increaseArmor} style={{ padding: '5px 10px', cursor: 'pointer' }}>
          Increase Armor
        </button>
      </div>
    </div>
  );
};

export default PlayerStats;
