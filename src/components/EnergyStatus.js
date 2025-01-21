
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
    // Логика восстановления здоровья с интервалом
    useEffect(() => {
      const healthRegenInterval = setInterval(() => {
        if (characterId.health < characterId.maxHealth) {
            characterId.health = Math.min(characterId.health + 1, characterId.maxHealth);
        }
      }, 5000); // Восстановление каждые 5 секунд
  
      console.log('смотрю хп',characterId.health)
      return () => clearInterval(healthRegenInterval); // Очистка таймера
    }, [characterId]);
  
    // Функция для использования зелья здоровья
    const useHealthPotion = () => {
        characterId.health = Math.min(characterId.health + 10, characterId.maxHealth); // Восстанавливает 10 HP
        console.log("хп", characterId.health );
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