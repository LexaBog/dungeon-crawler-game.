
import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { fetchCharacter, updateCharacter } from "../redux/sliser/characterSlice";
import EnergyStatus from "./EnergyStatus";
import './characterInfo.css'
// import { useDispatch } from "react-redux";
import { useSelect } from "@react-three/drei";
import { update } from "three/examples/jsm/libs/tween.module.js";

const CharacterInfo = ({telegramId}) => {

  const dispatch = useDispatch();
  const {data: character, loading, error} = useSelector((state) => state.character);

  useEffect(() =>{
    dispatch(fetchCharacter(telegramId));
  },[dispatch, telegramId])

  if (!character) return <p>Персонаж не найден</p>;
  return (
    <div >
      <div>
        
        <EnergyStatus
         
          />
          {/* <p>Здоровье: {character.health} / {character.maxHealth}</p> */}
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
          {character.strength}
        </p>
        <p className="stats-numer">
          <img  className="stats-Icon" src="/img/icon/agiliti.png" alt="agiliti" />
            {character.agility}
        </p>
        <p className="stats-numer">
          <img  className="stats-Icon" src="/img/icon/inteligenke.png" alt="inteligenke" />
          {character.intelligence}
        </p>
        <p className="stats-numer">
          <img  className="stats-Icon" src="/img/icon/armor.png" alt="armor" />
          {character.baseArmor}
        </p>
        <p className="stats-numer">
          <img  className="stats-Icon" src="/img/icon/evaigion.webp" alt="evaigion" />
          {character.baseEvasion}
        </p>
        <p className="stats-numer">
           <img  className="stats-Icon" src="/img/icon/ataks.png" alt="ataks" />
            {character.baseAttack}
        </p>
      </div>
      <div className="equipped-items">
        <h3>Экипированные предметы:</h3>
        {character.equippedItems && character.equippedItems.length > 0 ? (
          <ul>
            {character.equippedItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>Нет экипированных предметов</p>
        )}
      </div>
      <div className="inventory">
        <h3>Инвентарь:</h3>
        {character.inventory && character.inventory.length > 0 ? (
          <ul>
            {character.inventory.map((item, index) => (
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
