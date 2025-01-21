import React, { useEffect } from "react";
import "./energyStatus.css";
import { updateCharacter } from "./authService";

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
  const saveUpdates = async (updates) => {
    try {
      const updatedCharacter = await updateCharacter(characterId._id, updates);
      Object.assign(characterId, updatedCharacter); // Обновляем объект персонажа
    } catch (error) {
      console.error("Ошибка сохранения данных персонажа:", error);
    }
  };

  useEffect(() => {
    const healthRegenInterval = setInterval(() => {
      if (characterId.health < characterId.maxHealth) {
        const newHealth = Math.min(characterId.health + 1, characterId.maxHealth);
        saveUpdates({ health: newHealth }); // Универсальный вызов для обновления здоровья
      }
    }, 5000);

    return () => clearInterval(healthRegenInterval);
  }, [characterId]);

  const useHealthPotion = () => {
    const newHealth = Math.min(characterId.health + 10, characterId.maxHealth);
    saveUpdates({ health: newHealth }); // Универсальный вызов для зелья здоровья
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
