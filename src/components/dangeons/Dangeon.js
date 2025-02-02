import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDungeons, startDungeon, completeDungeon, collectRewards } from "../../redux/sliser/dungeonSlice";
import { fetchActiveDungeons } from "../../redux/sliser/userSlice";
import TimeFormatter from "../tymeFormatter/TimeFormatter";
import Awards from "../awards/Awards1-10"
import "./dungeon.css";

const DungeonList = ({ telegramId }) => {
  const [timers, setTimers] = useState([]); // Таймеры для активных подземелий
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [reward, setReward] = useState(null);


  // Данные из Redux
  const { dungeons, rewards, loading, error } = useSelector((state) => state.dungeon);
  const activeDungeons = useSelector((state) => state.user.activeDungeons); // Активные подземелья из Redux

  // Загружаем активные подземелья при загрузке страницы
  useEffect(() => {
    const fetchActiveDungeonsOnLoad = async () => {
      try {
        await dispatch(fetchActiveDungeons(telegramId)).unwrap(); // Загружаем активные подземелья
      } catch (error) {
        console.error("Ошибка загрузки активных подземелий:", error);
      }
    };

    fetchActiveDungeonsOnLoad();
  }, [dispatch, telegramId]);

  // Инициализация таймеров на основе активных подземелий
  useEffect(() => {
    const initializeTimers = () => {
      const now = Date.now();
      const initializedTimers = activeDungeons.map((dungeon) => {
        const timeLeft = Math.max(0, new Date(dungeon.endTime).getTime() - now);
        return { dungeonId: dungeon.dungeonId, timeLeft: timeLeft / 1000 }; // Секунды
      });
      setTimers(initializedTimers);
    };
    
    initializeTimers();
  }, [activeDungeons]);
 

  // Обновляем таймеры каждую секунду
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          const timeLeft = Math.max(0, timer.timeLeft - 1); // Уменьшаем оставшееся время
          return { ...timer, timeLeft };
        })
      );
    }, 1000);

    return () => clearInterval(interval); // Удаляем интервал при размонтировании
  }, []);

  // useEffect(() => {
  //   const syncRewardsState = async () => {
  //     try {
  //       for (const dungeon of activeDungeons) {
  //         const now = Date.now();
  
  //         // Проверяем, истёк ли таймер и не собраны ли награды
  //         if (new Date(dungeon.endTime).getTime() <= now && dungeon.isRewardCollected) {
  //           console.log(`Обновляем состояние наград для подземелья: ${dungeon.dungeonId._id}`);
  
  //           // Отправляем запрос для обновления `isRewardCollected` на сервер
  //           await dispatch(collectRewards({ telegramId, dungeonId: dungeon.dungeonId._id })).unwrap();
  
  //           // Обновляем активные подземелья
  //           await dispatch(fetchActiveDungeons(telegramId)).unwrap();
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Ошибка при синхронизации состояния наград:", error);
  //     }
  //   };
  
  //   syncRewardsState();
  // }, [activeDungeons, dispatch, telegramId]);
  
  

  // Загружаем список подземелий
  useEffect(() => {
    dispatch(fetchDungeons());
  }, [dispatch]);

  const handleStartDungeon = async (_id) => {
    try {
      const response = await dispatch(startDungeon({ telegramId, _id })).unwrap();
      await dispatch(fetchActiveDungeons(telegramId)).unwrap(); // Перезагружаем активные подземелья после запуска
    } catch (error) {
      console.error("Ошибка запуска подземелья:", error);
    }
  };

  const handleComplete = async (_id) => {
    try {
  
      const response = await dispatch(completeDungeon({ telegramId, dungeonId: _id })).unwrap();
      console.log("Награды собраны:", response);
  
      // Проверяем, вернулся ли объект наград
      if (response?.rewards) {
        setReward(response.rewards); // Сохраняем награды
        setModalVisible(true); // Открываем модальное окно
      } else {
        console.error("Награды отсутствуют в ответе:", response);
      }
  
        // чтобы убедиться, что UI сразу отобразит изменённое состояние.
      await dispatch(fetchActiveDungeons(telegramId)).unwrap();
      
    } catch (error) {
      console.error("Ошибка при сборе наград:", error);
  
      // Обработка ошибок
      setReward({ gold: 0, experience: 0, error: "Ошибка при сборе наград" });
      setModalVisible(true);
    }
  };
  
  
  
  
  const closeModal = () => {
    setModalVisible(false);
    setReward(null);
  };
  

  if (loading) return <p>Загрузка...</p>;
  if (error)
    return (
      <p>
        Ошибка:{" "}
        {typeof error === "object"
          ? error.error || error.message || JSON.stringify(error)
          : error}
      </p>
    );
  

  return (
    <ul className="dungeon-list">
      {[...dungeons].sort((a, b) => a.level - b.level).map((dungeon) => {
        const activeDungeon = activeDungeons.find(
          (ad) => ad.dungeonId._id.toString() === dungeon._id.toString()
        );
        const timer = timers.find((t) => {
          // Если t.dungeonId — объект и содержит _id:
          if (typeof t.dungeonId === "object" && t.dungeonId !== null && t.dungeonId._id) {
            return String(t.dungeonId._id) === String(dungeon._id);
          }
          // Если t.dungeonId уже строка:
          return String(t.dungeonId) === String(dungeon._id);
        });
        

  
        // console.log("Active Dungeon:", activeDungeon);
        // console.log("Timer:", timer);
  
        return (
          <li key={dungeon._id}>
            <p>Уровень: {dungeon.level}</p>
            <p>Длительность: <TimeFormatter seconds={dungeon.duration} /></p>
            {activeDungeon ? (
  <>
    {timer && timer.timeLeft > 0 ? (
      <p>
        До завершения подземелья осталось:{" "}
        <TimeFormatter seconds={Math.floor(timer.timeLeft)} />
      </p>
    ) : activeDungeon.isRewardCollected ? (
      // Если флаг true (награды доступны для сбора), показываем кнопку "Собрать награды"
      <button onClick={() => handleComplete(dungeon._id)}>Собрать награды</button>
    ) : (
      // Если флаг false (награды уже собраны), показываем кнопку "Запустить"
      <button onClick={() => handleStartDungeon(dungeon._id)}>Запустить</button>
    )}
  </>
) : (
  <button onClick={() => handleStartDungeon(dungeon._id)}>Запустить</button>
)}

            {/* Модальное окно для наград */}
            <Awards
              isVisible={isModalVisible}
              onClose={closeModal}
              rewards={reward || { gold: 0, experience: 0 }}
            />
          </li>
        );
      })}
    </ul>
  );
  
  
};

export default DungeonList;
