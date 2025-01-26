import React, { useEffect, useState } from "react";
import fetchDungeons from "./fetchDungeons";
import "./dungeon.css";
import axios from "axios";

const DungeonList = ({telegramId}) => {
  const [dungeons, setDungeons] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Управление отображением списка

  const toggleDungeonList = () => {
    setIsOpen((prev) => !prev); // Переключение состояния
  };

  const [timeLeft, setTimeLeft] = useState(null);

  const startDungeon = async (dungeonId, telegramId) => {
    try {
      const response = await axios.post("http://localhost:5021/api/dungeons/start", {
        telegramId,
        dungeonId,
      });

    const endTime = new Date(response.data.dungeon.endTime);

    // Обновляем оставшееся время
    const updateTimer = () => {
      const now = new Date();
      const remainingTime = Math.max(0, (endTime - now) / 1000); // Время в секундах
      setTimeLeft(remainingTime);

      if (remainingTime === 0) {
        clearInterval(timer);
      }
    };

    // Устанавливаем интервал для обновления таймера каждую секунду
    const timer = setInterval(updateTimer, 1000);

    updateTimer(); // Первый вызов для мгновенного обновления
    alert(`Подземелье "${response.data.dungeon.name}" начато!`);
  } catch (error) {
    console.error("Ошибка запуска подземелья:", error.response?.data || error.message);
    alert("Не удалось запустить подземелье.");
  }
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
                <button onClick={() => startDungeon(dungeon._id, telegramId)}>start</button>
            </div>
          ))}
        </ul>
      )}
        <div>
          {timeLeft !== null ? (
            <p>До завершения подземелья осталось: {Math.ceil(timeLeft)} секунд</p>
          ) : (
            <p>Подземелье не запущено</p>
          )}
      </div>
    </div>
  );
};

export default DungeonList;
