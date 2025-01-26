import React, { useEffect, useState } from "react";
import fetchDungeons from "./fetchDungeons";
import "./dungeon.css";
import axios from "axios";

const DungeonList = ({userId}) => {
  const [dungeons, setDungeons] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Управление отображением списка

  const toggleDungeonList = () => {
    setIsOpen((prev) => !prev); // Переключение состояния
  };

  const startDungeon = async (dungeonId) => {
    console.log("user", userId, "dangeon", dungeonId)
    try {
      const response = await axios.post("http://localhost:5021/api/dungeons/start", {
        userId,
        dungeonId,
      });
      alert(`Подземелье "${response.data.dungeon.name}" начато!`);
    } catch (error) {
      console.error("Ошибка запуска подземелья:", error.response?.data || error.message);
      alert("Не удалось запустить подземелье.")
    }
  }

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
    <div className="fulBodiDungeons">
      <div className="buttonDunght-1-10">
        <h2>Сбор душ 1-10 уровень</h2>
        <button className="butonOnDungeon" onClick={toggleDungeonList}>
          {isOpen ? "Скрыть" : "Открыть"}
        </button>
      </div>
      {isOpen && (
        <ul className="dungeon-list">
          {dungeons.map((dungeon) => (
            <div key={dungeon._id}>
                <p>
                    Уровень: {dungeon.level}
                </p>
                <p>
                    длительность {dungeon.duration} c
                </p>
                <p>
                    золото: {dungeon.gold}
                </p>
                <p>
                    опыт {dungeon.experience} 
                </p>
                <p>
                     карта героя{dungeon.cardDropChance} %
                </p>
                <button onClick={() => startDungeon(dungeon._id)}>start</button>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DungeonList;
