import React, { useEffect, useState } from "react";
import { fetchCharacter, authenticateUser } from "../components/authService.js";

const CharacterInfo = ({ onCharacterLoaded }) => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCharacter = async () => {
      try {
        // Авторизация и получение токена
        await authenticateUser();

        // Загрузка данных персонажа
        const data = await fetchCharacter(); // Токен передается автоматически
        setCharacter(data);
        onCharacterLoaded(data); // Передаём данные в родительский компонент
      } catch (error) {
        console.error("Ошибка загрузки персонажа:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCharacter();
  }, [onCharacterLoaded]); // Используем зависимость для передачи данных

  if (loading) return <p>Загрузка...</p>;

  if (!character) return <p>Персонаж не найден</p>;

  return (
    <div>
      <h2>Информация о персонаже</h2>
      <p>Имя: {character.name}</p>
      <p>Уровень: {character.level}</p>
      <p>Опыт: {character.experience}</p>
      <p>Здоровье: {character.health}</p>
      <p>Сила: {character.strength}</p>
      <p>Ловкость: {character.agility}</p>
      <p>Интеллект: {character.intelligence}</p>
    </div>
  );
};

export default CharacterInfo;
