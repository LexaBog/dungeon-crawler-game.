import React from "react";
import "./Awards1-10.css"; // Создайте файл стилей

const Awards = ({ isVisible, onClose, rewards }) => {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Подземелье завершено!</h2>
        <p>Вы получили:</p>
        <ul>
          <li>Золото: {rewards.gold}</li>
          <li>Опыт: {rewards.experience}</li>
        </ul>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default Awards;
