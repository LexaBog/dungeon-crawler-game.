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
  const [localCharacter, setLocalCharacter] = useState(characterId);
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
      if (localCharacter.health < characterId.maxHealth) {
        const newHealth = Math.min(localCharacter.health + 1, characterId.maxHealth);
        setLocalCharacter((prev) => ({ ...prev, health: newHealth }));

        // Отправляем данные только если здоровье изменилось
        updateCharacter(characterId.telegramId, { health: newHealth });
      }
    }, 5000); // Обновляем каждые 5 секунд

    return () => clearInterval(healthRegenInterval);
  }, [characterId, setCharacterId]);

  const useHealthPotion = () => {
    const newHealth = Math.min(characterId.health - 10, characterId.maxHealth);
    saveUpdates({ health: newHealth });
  };

  const useExperiencePotion = () => {
    const experienceFromPotion = 50; // Опыт, полученный от зелья
    updateCharacter(telegramId, { experience: experienceFromPotion })
      .then((updatedCharacter) => {
        console.log("Персонаж обновлён после использования зелья:", updatedCharacter);
        setCharacter(updatedCharacter);
      })
      .catch((error) => {
        console.error("Ошибка обновления персонажа после использования зелья:", error);
      });
  };
  
  return (
    <div className="energy-status">
      <ProgressBar label="Здоровье" value={characterId.health} max={characterId.maxHealth} color="#b22222" />
      <ProgressBar label="Мана" value={characterId.mana} max={characterId.maxMana} color="blue" />
      <button onClick={useHealthPotion} className="use-potion-button">
        Использовать зелье здоровья
      </button>
      
      {console.log("Рендер компонента EnergyStatus")}
      <button onClick={useExperiencePotion} className="use-potion-button1">
        Использовать зелье опыта
      </button>
    </div>
  );
};

export default EnergyStatus;
