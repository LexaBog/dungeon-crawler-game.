import React, { useState, useEffect } from "react";
import "./Dungeon.css";

const Dungeon = ({ player, onPlayerUpdate }) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [activeDungeon, setActiveDungeon] = useState(null); // Текущее подземелье
  const [remainingTime, setRemainingTime] = useState(0); // Оставшееся время в секундах
  const [timerId, setTimerId] = useState(null); // ID таймера
  const [dungeonResult, setDungeonResult] = useState(null); // Результат прохождения (победа или поражение)
  const [pendingRewards, setPendingRewards] = useState(null); // Награды, ожидающие подтверждения

  const dungeons = [
    { id: 1, name: "Easy Dungeon", strength: 50, time: 0.001, gold: 50, experience: 100 },
    { id: 2, name: "Medium Dungeon", strength: 100, time: 6, gold: 150, experience: 300 },
    { id: 3, name: "Hard Dungeon", strength: 200, time: 12, gold: 300, experience: 500 },
    { id: 4, name: "Epic Dungeon", strength: 400, time: 24, gold: 1000, experience: 1200 },
  ];

  const openListDungeon = () => setIsListOpen(true);
  const closeListDungeon = () => setIsListOpen(false);

  const enterDungeon = (dungeon) => {
    if (activeDungeon) {
      alert("Вы уже находитесь в подземелье!");
      return;
    }

    const durationInSeconds = dungeon.time * 3600; // Переводим часы в секунды
    setActiveDungeon(dungeon);
    setRemainingTime(durationInSeconds);

    const id = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(id); // Останавливаем таймер
          completeDungeon(dungeon); // Завершаем подземелье
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    setTimerId(id);
  };

  const completeDungeon = (dungeon) => {
    const successChance = player.power >= dungeon.strength ? 0.9 : 0.4;
    const isVictory = Math.random() < successChance;

    if (isVictory) {
      setPendingRewards({
        xp: dungeon.experience,
        gold: dungeon.gold,
        status: "Victory",
        message: `You won! Gained ${dungeon.gold} gold and ${dungeon.experience} XP.`,
      });
    } else {
      setPendingRewards({
        xp: -Math.round(player.xp * 0.1), // Потеря 10% опыта
        gold: 0,
        status: "Defeat",
        message: `You lost... Lost 10% XP.`,
      });
    }

    setActiveDungeon(null); // Очищаем активное подземелье
  };

  const acceptRewards = () => {
    if (pendingRewards) {
      const updatedPlayer = {
        ...player,
        xp: Math.max(0, player.xp + pendingRewards.xp),
        gold: player.gold + pendingRewards.gold,
      };

      onPlayerUpdate(updatedPlayer); // Обновляем состояние игрока
      setDungeonResult(null);
      setPendingRewards(null);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    return () => {
      if (timerId) clearInterval(timerId); // Очищаем таймер при размонтировании
    };
  }, [timerId]);

  return (
    <div>
      <button
        className={isListOpen ? "displaOF" : "buttonOpenListDungeon"}
        onClick={openListDungeon}
      >
        Open Dungeons
      </button>
      {isListOpen && !activeDungeon && !pendingRewards && (
        <div className="dungeonList">
          <h2>Available Dungeons</h2>
          {dungeons.map((dungeon) => (
            <div key={dungeon.id} className="dungeonCard">
              <h3>{dungeon.name}</h3>
              <p><strong>Strength:</strong> {dungeon.strength}</p>
              <p><strong>Time to Complete:</strong> {dungeon.time} hours</p>
              <p><strong>Gold Reward:</strong> {dungeon.gold} gold</p>
              <p><strong>Experience Reward:</strong> {dungeon.experience} XP</p>
              <p><strong>Your Strength:</strong> {player.power}</p>
              <button onClick={() => enterDungeon(dungeon)}>
                Enter {dungeon.name}
              </button>
            </div>
          ))}
          <button className="zIndex" onClick={closeListDungeon}>
            Close
          </button>
        </div>
      )}
      {activeDungeon && (
        <div className="activeDungeon">
          <h2>In Dungeon: {activeDungeon.name}</h2>
          <p><strong>Time Remaining:</strong> {formatTime(remainingTime)}</p>
        </div>
      )}
      {pendingRewards && (
        <div className="dungeonResult">
          <h2>{pendingRewards.status}</h2>
          <p>{pendingRewards.message}</p>
          <button onClick={acceptRewards}>Accept Rewards</button>
        </div>
      )}
    </div>
  );
};

export default Dungeon;
