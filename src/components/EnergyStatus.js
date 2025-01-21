// EnergyStatus.js
import React, { useState, useEffect } from "react";
import "./energyStatus.css";

const ProgressBar = ({ label, value, max, color }) => (
  <div className="progress-bar">
    <div className="bar">
      <div
        className="fill"
        style={{
          width: `${(value / max) * 100}%`,
          backgroundColor: color,
        }}
      >
        <span className="value-text">{`${label}: ${value} / ${max}`}</span>
      </div>
    </div>
  </div>
);

const EnergyStatus = ({ characterId }) => {
  const [health, setHealth] = useState(initialHealth);
  const [mana, setMana] = useState(initialMana);

  // Логика восстановления здоровья с интервалом
  useEffect(() => {
    const healthRegenInterval = setInterval(() => {
      setHealth((prev) => Math.min(prev + 1, characterId.maxHealth)); // Восстанавливает 1 HP
    }, 5000); // Восстановление каждые 5 секунд

    return () => clearInterval(healthRegenInterval); // Очистка таймера
  }, [characterId.maxHealth]);

  // Функция для использования зелья здоровья
  const useHealthPotion = () => {
    setHealth((prev) => Math.min(prev + 10, characterId.maxHealth)); // Восстанавливает 20 HP
  };

  return (
    <div className="energy-status">
      <ProgressBar label="Здоровье" value={characterId.health} max={characterId.maxHealth} color="#b22222" />
      <ProgressBar label="Мана" value={characterId.mana} max={characterId.maxMana} color="blue" />
      <button onClick={useHealthPotion} className="use-potion-button">
        Использовать зелье здоровья
      </button>
    </div>
  );
};

export default EnergyStatus;
