import React, { useEffect, useState } from "react";
import fetchDungeons from "./fetchDungeons";
import "./dungeon.css";
import axios from "axios";
import Awards from "../awards/Awards1-10";

const DungeonList = ({ telegramId }) => {
  const [dungeons, setDungeons] = useState([]);
  const [activeDungeons, setActiveDungeons] = useState([]);
  const [error, setError] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [rewards, setRewards] = useState(null);

  useEffect(() => {
    const loadDungeons = async () => {
      try {
        setError(null);

        // Загружаем список всех подземелий
        const data = await fetchDungeons();
        setDungeons(data);

        // Получаем список активных подземелий
        const userResponse = await axios.get(`http://localhost:5021/api/user/${telegramId}`);
        setActiveDungeons(userResponse.data.activeDungeons || []);
      } catch (err) {
        console.error(err);
        setError("Не удалось загрузить данные о подземельях");
      }
    };

    loadDungeons();

    // Обновление таймера каждую секунду
    const timer = setInterval(() => {
      setActiveDungeons((prevDungeons) =>
        prevDungeons.map((dungeon) => {
          const now = new Date();
          const timeLeft = Math.max(0, (new Date(dungeon.endTime) - now) / 1000);
          return { ...dungeon, timeLeft };
        })
      );
    }, 1000);

    return () => clearInterval(timer); // Очищаем таймер при размонтировании компонента
  }, [telegramId]);

  const startDungeon = async (dungeonId) => {
    try {
      const response = await axios.post("http://localhost:5021/api/dungeons/start", {
        telegramId,
        dungeonId,
      });

      const newActiveDungeon = response.data.dungeon;
      setActiveDungeons((prev) => [...prev, { ...newActiveDungeon, timeLeft: newActiveDungeon.duration }]);
    } catch (error) {
      console.error("Ошибка запуска подземелья:", error.response?.data || error.message);
      alert("Не удалось запустить подземелье.");
    }
  };

  const completeDungeon = async (dungeonId) => {
    try {
      const response = await axios.post("http://localhost:5021/api/dungeons/complete", {
        telegramId,
        dungeonId,
      });

      // Показываем награды в модальном окне
      setRewards(response.data.rewards);
      setModalVisible(true);

      // Обновляем список активных подземелий
      setActiveDungeons((prev) =>
        prev.filter((dungeon) => dungeon.dungeonId !== dungeonId)
      );
    } catch (error) {
      console.error("Ошибка завершения подземелья:", error.response?.data || error.message);
      alert("Не удалось завершить подземелье.");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setRewards(null);
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="fulBodiDungeons">
      {/* Модальное окно для наград */}
      <Awards
        isVisible={isModalVisible}
        onClose={closeModal}
        rewards={rewards || { gold: 0, experience: 0 }}
      />
      <div className="buttonDunght-1-10">
        <h2>Сбор душ 1-10 уровень</h2>
      </div>
      <ul className="dungeon-list">
        {dungeons.map((dungeon) => {
          const activeDungeon = activeDungeons.find((ad) => ad.dungeonId === dungeon._id);

          return (
            <div key={dungeon._id}>
              <p>Уровень: {dungeon.level}</p>
              <p>Длительность: {dungeon.duration} с</p>
              {activeDungeon ? (
                <>
                  {activeDungeon.timeLeft > 0 ? (
                    <p>До завершения подземелья осталось: {Math.ceil(activeDungeon.timeLeft)} секунд</p>
                  ) : (
                    <button onClick={() => completeDungeon(dungeon._id)}>Завершить</button>
                  )}
                </>
              ) : (
                <button onClick={() => startDungeon(dungeon._id)}>Запустить</button>
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default DungeonList;

