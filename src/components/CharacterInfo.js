import React, { useEffect, useState } from "react";
import { fetchCharacter } from "../components/authService.js"; // Импортируем функцию из сервиса

const CharacterInfo = ({ onCharacterLoaded }) => {
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCharacter = async () => {
          try {
            // Загрузка данных персонажа
            const data = await fetchCharacter(); // Токен уже передается через fetchCharacter
            setCharacter(data);
          } catch (error) {
            console.error("Ошибка загрузки персонажа:", error);
          } finally {
            setLoading(false);
          }
        };
      
        loadCharacter();
    }, []); // Убираем зависимости, так как они не нужны
      

    if (loading) return <p>Загрузка...</p>;

    if (!character) return <p>Персонаж не найден</p>;

    return (
        <div>
            <h2>Информация о персонаже</h2>
            <p>Имя: {character.name}</p>
            <p>Уровень: {character.level}</p>
            <p>Опыт: {character.experience}</p>
        </div>
    );
};

export default CharacterInfo;
// const handleLogin = async () => {
//   try {
//       // Авторизация и получение токена
//       const user = await authenticateUser(telegramId, username);

//       // Получение данных персонажа
//       const character = await fetchCharacter();
//       console.log("Данные персонажа:", character);
//       setCharacter(character); // Сохраняем данные персонажа в состоянии
//   } catch (error) {
//       console.error("Ошибка входа:", error);
//   }
// };

// useEffect(() => {
//   handleLogin();
// }, []);
