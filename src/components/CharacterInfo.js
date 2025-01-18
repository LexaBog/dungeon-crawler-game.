import React, { useEffect, useState } from "react";
import { authenticateUser } from "../components/authService.js";

const CharacterInfo = () => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCharacter = async () => {
      try {
        // const telegramId = "123456"; // Замените тестовыми данными или реальными значениями
        // const username = "TestUser"; // Тестовые данные

        const user = await authenticateUser(telegramId, username);
        console.log("Данные пользователя:", user);

        setCharacter(user.characterId); // Сохраняем данные персонажа
      } catch (error) {
        console.error("Ошибка загрузки персонажа:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCharacter();
  }, []);

  if (loading) return <p>Загрузка...</p>;

  if (!character) return <p>Персонаж не найден</p>;

  return (
    <div>
      <h2>Информация о персонаже</h2>
      <p>Имя: {character.name}</p>
      <p>Уровень: {character.level}</p>
      <p>Опыт: {character.experience}</p>
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
