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

const EnergyStatus = ({ character }) => {
  const saveUpdates = async (updates) => {
    try {
      const updatedCharacter = await updateCharacter(character._id, updates);
      Object.assign(character, updatedCharacter); // Обновляем объект персонажа
    } catch (error) {
      console.error("Ошибка сохранения данных персонажа:", error);
    }
  };

  useEffect(() => {
    const healthRegenInterval = setInterval(() => {
      if (character.health < character.maxHealth) {
        const newHealth = Math.min(character.health + 1, character.maxHealth);
        saveUpdates({ health: newHealth }); // Универсальный вызов для обновления здоровья
      }
    }, 5000);

    return () => clearInterval(healthRegenInterval);
  }, [character]);

  const useHealthPotion = () => {
    const newHealth = Math.min(character.health + 10, character.maxHealth);
    saveUpdates({ health: newHealth }); // Универсальный вызов для зелья здоровья
  };

  return (
    <div className="energy-status">
      <ProgressBar label="Здоровье" value={character.health} max={character.maxHealth} color="#b22222" />
      <ProgressBar label="Мана" value={character.mana} max={character.maxMana} color="blue" />
      <button onClick={useHealthPotion} className="use-potion-button">
        Использовать зелье здоровья
      </button>
    </div>
  );
};

export default EnergyStatus;
