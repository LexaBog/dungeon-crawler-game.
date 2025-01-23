import React from 'react';
import { useNavigate } from "react-router-dom";
import './header.css'

const Game = ({characterId}) => {
    if (!characterId) {
        return <div className="header">Loading...</div>; // Показываем что-то, пока данные не загрузятся
      }
 return (
    <>
        <div className="header">
            <h1 className="headerText">Dungeons s Heroes</h1>
        </div>
        <div className="boxNameUndLavel">
            <p>{characterId.name}</p>
            <p className="texStyleHeader">{characterId.level} level </p>
            <p className="texStyleHeader"> Опыт: {characterId.experience}</p>
        </div>
        <button className="navigate-button-houm" onClick={() => navigate("/")}>
                <img src="/button-Houm.webp" alt="Home" />
                {/* Дом */}
        </button>
    </>
 );
};

export default Game