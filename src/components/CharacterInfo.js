import React, { useEffect, useState } from "react";
// import { authenticateUser, fetchCharacter } from "./authService";
import './characterInfo.css'

const CharacterInfo = ({ telegramId, username, characterId }) => {
  const [character, setCharacter] = useState(null);
  // const [loading, setLoading] = useState(true);
  
  console.log("Пропсы в CharacterInfo:", { characterId });


  // useEffect(() => {
  //   const loadCharacter = async (characterId) => {
  //     try {
  //       console.log("Запрос персонажа для characterId:", characterId);
  //       const character = await fetchCharacter(characterId); // Используем переданный в пропсах characterId
  //       setCharacter(character);
  //     } catch (error) {
  //       console.error("Ошибка загрузки персонажа:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   loadCharacter();
  // }, [characterId]); // Следим за пропсом characterId
  

  // if (loading) return <p>Загрузка...</p>;
  if (!characterId) return <p>Персонаж не найден</p>;
  return (
    <div >
      <div className="boxNameUndLavel">
        <p>{characterId.name}</p>
        <p className="texStyleHeader">{characterId.level} level </p>
        <p className="texStyleHeader"> Опыт: {characterId.experience}</p>
        {/* {console.log(character.name,)} */}
      </div>
      <p>Здоровье: {characterId.health}</p>
      <p>Мана: {characterId.mana}</p>
      <p>Сила: {characterId.strength}</p>
      <p>Ловкость: {characterId.agility}</p>
      <p>Интеллект: {characterId.intelligence}</p>
      <p>Базовая броня: {characterId.baseArmor}</p>
      <p>Базовое уклонение: {characterId.baseEvasion}</p>
      <p>Базовая атака: {characterId.baseAttack}</p>
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
  );
};

export default CharacterInfo;
