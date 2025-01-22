import React, { useEffect, useState } from "react";
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
  const [localCharacter, setLocalCharacter] = useState(characterId);

  const saveUpdates = async (updates) => {
    try {
      const updatedCharacter = await updateCharacter(characterId.telegramId, updates);
      setCharacterId((prev) => ({ ...prev, ...updatedCharacter }));
    } catch (error) {
      console.error("Error updating character:", error);
    }
  };

  useEffect(() => {
    const healthRegenInterval = setInterval(() => {
      if (localCharacter.health < localCharacter.maxHealth) {
        const newHealth = Math.min(localCharacter.health + 1, localCharacter.maxHealth);
        setLocalCharacter((prev) => ({ ...prev, health: newHealth }));
  
        // Сохранение изменений на сервере
        updateCharacter(characterId.telegramId, { health: newHealth })
          .then(() => console.log("Health updated on server:", newHealth))
          .catch((error) => console.error("Error updating health:", error));
      }
    }, 5000);
  
    return () => clearInterval(healthRegenInterval);
  }, [localCharacter, characterId]);
  

  const useHealthPotion = () => {
    const newHealth = Math.min(localCharacter.health - 50, localCharacter.maxHealth);
    setLocalCharacter((prev) => ({ ...prev, health: newHealth }));
    saveUpdates({ health: newHealth });
  };

  return (
    <div className="energy-status">
      <ProgressBar label="Health" value={localCharacter.health} max={localCharacter.maxHealth} color="#b22222" />
      <ProgressBar label="Mana" value={localCharacter.mana} max={localCharacter.maxMana} color="blue" />
      <button onClick={useHealthPotion} className="use-potion-button">
        Use Health Potion
      </button>
    </div>
  );
};

export default EnergyStatus;
