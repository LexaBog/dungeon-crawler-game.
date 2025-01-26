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
  
      // Лог для проверки поля duration
      const duration = response.data.dungeon.duration;
      console.log("Длительность подземелья (duration):", duration);
  
      // Если duration отсутствует
      if (!duration) {
        console.error("Сервер не вернул длительность подземелья (duration)");
        return;
      }
  
      setTimeLeft(duration);
      console.log("Установлено значение timeLeft:", duration);
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
    console.log("timeLeft изменился:", timeLeft);

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
                  onClick={() => {
                    console.log("Кнопка нажата"); // Проверяем, вызывается ли событие
                    startDungeon(dungeon._id, telegramId);
                  }}
                  disabled={timeLeft > 0} // Кнопка блокируется, если таймер активен
                >
                  start
              </button>
            </div>
          ))}
        </ul>
      )}
      <div>
        {/* {timeLeft !== null && timeLeft > 0 ? ( */}
          <p>До завершения подземелья осталось: {Math.ceil(timeLeft)} секунд</p>
          {console.log(timeLeft)}
          {console.log("Таймер отображается:", timeLeft)}
        {/* ) : ( */}
          <p>Подземелье не запущено</p>
          {console.log("Подземелье не запущено")}
        {/* )} */}
      </div>
    </div>
  );
};

export default DungeonList;
