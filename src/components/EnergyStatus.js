import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCharacter } from "../redux/sliser/characterSlice";
import { fetchCharacter } from "../redux/sliser/characterSlice";
import "./energyStatus.css";

const ProgressBar = ({ label, value, max, color }) => (
  <div className="progress-bar">
    <div className="bar">
      <div
        className="fill"
        style={{
          width: `${(value / max) * 100}%`,
          backgroundColor: color,
        }}
      >
        <span className="value-text">{`${label}: ${value} / ${max}`}</span>
      </div>
    </div>
  </div>
);

const EnergyStatus = () => {
  const dispatch = useDispatch();
  const character = useSelector((state) => state.character.data);
  const [displayedHealth, setDisplayedHealth] = useState(character?.health || 0);

  useEffect(() => {
    if (!character) {
      dispatch(fetchCharacter(character.telegramId)); // Пример Telegram ID
    }
  }, [dispatch, character]);

  useEffect(() => {
    if (!character) return;

    const interval = setInterval(() => {
      const now = new Date();
      const elapsedSeconds = Math.floor((now - new Date(character.lastHealthUpdate)) / 1000);
      const regenRate = character.regenRate || 1; // Учитываем скорость регенерации с сервера
      const newHealth = Math.min(character.health + elapsedSeconds * regenRate, character.maxHealth);
      setDisplayedHealth(newHealth);
    }, 1000);

    return () => clearInterval(interval); // Очищаем таймер при размонтировании
  }, [character]);



  const useHealthPotion = () => {
    const newHealth = Math.min(character.health - 50, character.maxHealth);
    dispatch(updateCharacter({ telegramId: character.telegramId, updates: { health: newHealth } }));
  };

  return (
    <div className="energy-status">
      <ProgressBar label="Health" value={displayedHealth} max={character?.maxHealth || 100} color="#b22222" />
      {/* <ProgressBar label="Health" value={character.health} max={character.maxHealth} color="#b22222" /> */}
      <ProgressBar label="Mana" value={character.mana} max={character.maxMana} color="blue" />
      <button onClick={useHealthPotion} className="use-potion-button">
        Use Health Potion
      </button>
    </div>
  );
};

export default EnergyStatus;
