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

const EnergyStatus = ({ characterId, setCharacterId }) => {
  const saveUpdates = async (updates) => {
    try {
      const updatedCharacter = await updateCharacter(characterId.telegramId, updates);
      setCharacterId((prev) => ({ ...prev, ...updatedCharacter })); // Обновляем состояние
    } catch (error) {
      console.error("Ошибка сохранения данных персонажа:", error);
    }
  };

  useEffect(() => {
    const healthRegenInterval = setInterval(() => {
      if (characterId.health < characterId.maxHealth) {
        const newHealth = Math.min(characterId.health + 1, characterId.maxHealth);
        saveUpdates({ health: newHealth });
      }
    }, 5000);

    return () => clearInterval(healthRegenInterval);
  }, [characterId, setCharacterId]);

  const useHealthPotion = () => {
    const newHealth = Math.min(characterId.health - 10, characterId.maxHealth);
    saveUpdates({ health: newHealth });
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
