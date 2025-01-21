// import { useState } from 'react';
import React, {useState, useEffect} from "react";
import EnergyStatus from "./EnergyStatus";
import { authenticateUser, fetchCharacter } from "./authService";
import './characterInfo.css'

const CharacterInfo = ({ characterId}) => {
  // const [characterId, setCharacterId] = useState(null);
  
  // useEffect(() => {
  //   // Мокированные данные персонажа для тестирования
  //   const mockCharacter = {
  //     name: "AlexBelei",
  //     level: 5,
  //     experience: 1200,
  //     health: 100,
  //     maxHealth: 100,
  //     mana: 50,
  //     maxMana: 50,
  //     strength: 15,
  //     agility: 10,
  //     intelligence: 12,
  //     baseArmor: 5,
  //     baseEvasion: 3,
  //     baseAttack: 20,
  //     equippedItems: ["Меч рыцаря", "Шлем гладиатора"],
  //     inventory: ["Зелье здоровья", "Зелье маны", "Кинжал новичка"],
  //   };
  //   setCharacterId(mockCharacter);
  // }, []);

  console.log("Пропсы в CharacterInfo:", { characterId });

  if (!characterId) return <p>Персонаж не найден</p>;
  return (
    <div >
        <div className="boxNameUndLavel">
        <p>{characterId.name}</p>
        <p className="texStyleHeader">{characterId.level} level </p>
        <p className="texStyleHeader"> Опыт: {characterId.experience}</p>
        {/* {console.log(character.name,)} */}
        </div>
      <div>
        {/* <h1>Ваш персонаж</h1> */}
        <EnergyStatus
          characterId={characterId}  
          />
      </div>
      <div className="character-avatar">
      {/* Аватар или модель персонажа */}
        <img
          src="/img/character/character.png" // Замените на ваш путь к изображению
          alt="Персонаж"
          className="avatar-image"
        />
      </div>
      <div className="character-stats">
        <p>Сила: {characterId.strength}</p>
        <p>Ловкость: {characterId.agility}</p>
        <p>Интеллект: {characterId.intelligence}</p>
        <p>Базовая броня: {characterId.baseArmor}</p>
        <p>Базовое уклонение: {characterId.baseEvasion}</p>
        <p>Базовая атака: {characterId.baseAttack}</p>
        <h3>Экипированные предметы:</h3>
      </div>
      <div className="equipped-items">
        <h3>Экипированные предметы:</h3>
        {characterId.equippedItems && characterId.equippedItems.length > 0 ? (
          <ul>
            {characterId.equippedItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>Нет экипированных предметов</p>
        )}
      </div>
      <div className="inventory">
        <h3>Инвентарь:</h3>
        {characterId.inventory && characterId.inventory.length > 0 ? (
          <ul>
            {characterId.inventory.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>Инвентарь пуст</p>
        )}
      </div>
    </div>
  );
};

export default CharacterInfo;
