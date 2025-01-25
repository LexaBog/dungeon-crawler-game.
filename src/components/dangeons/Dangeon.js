import React, { useEffect, useState } from "react";
import fetchDungeons from "./fetchDungeons";
import "./dungeon.css";

const DungeonList = () => {
  const [dungeons, setDungeons] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Управление отображением списка

  const toggleDungeonList = () => {
    setIsOpen((prev) => !prev); // Переключение состояния
  };

  useEffect(() => {
      const loadDungeon = async () => {
          try {
              setError(null);
              const data = await fetchDungeons();
              setDungeons(data);
            } catch (err) {
                console.error(err); // Для отладки
                setError("Не удалось загрузить данные о подземельях");
            }
        };
        loadDungeon();
    }, []);
    
    if (error) return <p>{error}</p>;
    
    return (
    <div>
      <div className="buttonDunght-1-10">
        <h2>Сбор душ 1-10 уровень</h2>
        <button onClick={toggleDungeonList}>
          {isOpen ? "Скрыть" : "Открыть"}
        </button>
      </div>
      {isOpen && (
        <ul className="dungeon-list">
          {dungeons.map((dungeon) => (
            <li key={dungeon._id}>
              {dungeon.name} (Уровень: {dungeon.level})
              {dungeon.duration} {dungeon.experience} {dungeon.cardDropChance}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DungeonList;
