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

  const startDungeon = async (telegramId, dungeonId) => {
    console.log("startDungeon вызван с параметрами:", { telegramId, dungeonId });
  
    try {
      console.log("Ищем подземелье с ID:", dungeonId);
      const dungeon = await Dungeon.findById(dungeonId);
      if (!dungeon) {
        console.error("Подземелье не найдено");
        throw new Error("Подземелье не найдено");
      }
      console.log("Подземелье найдено:", dungeon);
  
      console.log("Ищем пользователя с telegramId:", telegramId);
      const user = await User.findOne({ telegramId });
      if (!user) {
        console.error("Пользователь не найден");
        throw new Error("Пользователь не найден");
      }
      console.log("Пользователь найден:", user);
  
      console.log("Обновляем состояние текущего подземелья пользователя...");
      user.currentDungeon = {
        dungeonId: dungeon._id,
        startTime: new Date(),
        duration: dungeon.duration,
      };
      await user.save();
      console.log("Состояние пользователя обновлено");
  
      return {
        message: "Подземелье успешно запущено",
        dungeon: {
          id: dungeon._id,
          name: dungeon.name,
          duration: dungeon.duration,
          experience: dungeon.experience,
          gold: dungeon.gold,
        },
      };
    } catch (error) {
      console.error("Ошибка в startDungeon:", error.message);
      throw error;
    }
  };
  
  
  

  useEffect(() => {
    // console.log("timeLeft изменился:", timeLeft);

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
          {console.log(dungeons.duration)}
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
