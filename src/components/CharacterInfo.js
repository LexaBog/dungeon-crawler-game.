
import React from "react";
import EnergyStatus from "./EnergyStatus";
import './characterInfo.css'

const CharacterInfo = ({characterId,  setCharacterId }) => {
 
  if (!characterId) return <p>Персонаж не найден</p>;
  return (
    <div >
      <div>
        {/* <h1>Ваш персонаж</h1> */}
        <EnergyStatus
          characterId={characterId}  
          setCharacterId={setCharacterId}
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
        <p className="stats-numer">
          <img  className="stats-Icon" src="/img/icon/strenght.png" alt="strenght" />
          {characterId.strength}
        </p>
        <p className="stats-numer">
          <img  className="stats-Icon" src="/img/icon/agiliti.png" alt="agiliti" />
            {characterId.agility}
        </p>
        <p className="stats-numer">
          <img  className="stats-Icon" src="/img/icon/inteligenke.png" alt="inteligenke" />
          {characterId.intelligence}
        </p>
        <p className="stats-numer">
          <img  className="stats-Icon" src="/img/icon/armor.png" alt="armor" />
          {characterId.baseArmor}
        </p>
        <p className="stats-numer">
          <img  className="stats-Icon" src="/img/icon/evaigion.webp" alt="evaigion" />
          {characterId.baseEvasion}
        </p>
        <p className="stats-numer">
           <img  className="stats-Icon" src="/img/icon/ataks.png" alt="ataks" />
            {characterId.baseAttack}
        </p>
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
