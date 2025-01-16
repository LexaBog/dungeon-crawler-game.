import React, { useEffect, useState } from "react";
import { fetchCharacter } from "../components/authService.js"; // Импортируем функцию из сервиса

const CharacterInfo = ({ onCharacterLoaded }) => {
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCharacter = async () => {
            try {
                const data = await fetchCharacter(); // Получаем данные персонажа через сервис
                setCharacter(data);
                onCharacterLoaded(data);
            } catch (error) {
                console.error("Ошибка загрузки персонажа:", error);
            } finally {
                setLoading(false);
            }
        };

        loadCharacter();
    }, [onCharacterLoaded]);

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
