import React, { useEffect, useState } from "react";
import { authenticateUser, fetchCharacter } from "./authService";
import './characterInfo.css'

const CharacterInfo = ({ telegramId, username }) => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // console.log("Пропсы в CharacterInfo:", { telegramId, username });


  useEffect(() => {
    const loadCharacter = async () => {
      try {
        console.log("Запрос авторизации:", { telegramId, username });
        const user = await authenticateUser(telegramId, username);
        console.log("Ответ от авторизации:", user);
        console.log("Запрос персонажа для characterId:", user.characterId);

        if (user?.characterId) {
          const character = await fetchCharacter(user.characterId);
          setCharacter(character);
        } else {
          console.error("Нет characterId в данных пользователя");
        }
      } catch (error) {
        console.error("Ошибка загрузки персонажа:", error);
      } finally {
        setLoading(false); // Отключаем загрузку
      }
    };

    loadCharacter();
  }, [telegramId, username]); // telegramId и username как зависимости

  if (loading) return <p>Загрузка...</p>;
  if (!character) return <p>Персонаж не найден</p>;
  return (
    <div >
      <div className="boxNameUndLavel">
        <p>{character.name}</p>
        <p className="texStyleHeader">{character.level} level </p>
        <p className="texStyleHeader"> Опыт: {character.experience}</p>
        {/* {console.log(character.name,)} */}
      </div>
      <p>Здоровье: {character.health}</p>
      <p>Мана: {character.mana}</p>
      <p>Сила: {character.strength}</p>
      <p>Ловкость: {character.agility}</p>
      <p>Интеллект: {character.intelligence}</p>
      <p>Базовая броня: {character.baseArmor}</p>
      <p>Базовое уклонение: {character.baseEvasion}</p>
      <p>Базовая атака: {character.baseAttack}</p>
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
  );
};

export default CharacterInfo;
