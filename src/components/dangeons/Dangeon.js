import React, { useEffect, useState } from "react";
import fetchDungeons from "./fetchDungeons";
import "./dungeon.css";
import axios from "axios";

const DungeonList = ({ telegramId }) => {
  const [dungeons, setDungeons] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  const toggleDungeonList = () => {
    setIsOpen((prev) => !prev);
  };

  const startDungeon = async (dungeonId, telegramId) => {
    console.log("Запуск подземелья с параметрами:", { dungeonId, telegramId });
    try {
      const response = await axios.post("http://localhost:5021/api/dungeons/start", {
        telegramId,
        dungeonId,
      });

      console.log("Ответ от сервера:", response.data);

      // Получаем длительность подземелья (в секундах)
      const duration = response.data.dungeon.duration;

      // Устанавливаем начальное состояние таймера
      setTimeLeft(duration);

      console.log(`Длительность подземелья: ${duration} секунд`);

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
        console.error(err);
        setError("Не удалось загрузить данные о подземельях");
      }
    };
    loadDungeon();
  }, []);

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

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
              <p>Уровень: {dungeon.level}</p>
              <p>длительность {dungeon.duration} c</p>
              <p>золото: {dungeon.gold}</p>
              <p>опыт {dungeon.experience}</p>
              <p>карта героя {dungeon.cardDropChance} %</p>
              <button
                onClick={() => startDungeon(dungeon._id, telegramId)}
                disabled={timeLeft > 0}
              >
                start
              </button>
            </div>
          ))}
        </ul>
      )}
      <div>
        {timeLeft !== null && timeLeft > 0 ? (
          <p>До завершения подземелья осталось: {Math.ceil(timeLeft)} секунд</p>
        ) : (
          <p>Подземелье не запущено</p>
        )}
      </div>
    </div>
  );
};

export default DungeonList;
