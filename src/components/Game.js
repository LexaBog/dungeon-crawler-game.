import React from 'react';

const Game = ({ character }) => {
    console.log(character)
    if (!character) {
        return <p>Загрузка игры...</p>;
    }

    return (
        <div>
            <h2>Информация о персонаже</h2>
            <p>Telegram ID: {character.telegramId}</p>
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

export default Game;
