import React from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExperienceBar from './ExperienceBar';
import './header.css'

const Header = () => {
    const navigate = useNavigate();

     // Берем данные персонажа из Redux
    const characterId = useSelector((state) => state.character.data);

    if (!characterId) {
        return <div className="header">Loading...</div>; // Показываем что-то, пока данные не загрузятся
      }
      console.log(" обновляються данные или нет ",characterId)
 return (
    <>
        <div className="header">
            <h1 className="headerText">Dungeons s Heroes</h1>
        </div>
        <div className='gold_box'>
            <img className='gold_img' src="/gold/gold.png" />
            <p>{characterId.gold}</p>
        </div>
        <div className="boxNameUndLavel">
            <p>{characterId.name}</p>
            <p className="texStyleHeader">{characterId.level} level </p>
            <p className="texStyleHeader"> Опыт: {characterId.experience}</p>
        </div>
        <button className="navigate-button-houm" onClick={() => navigate("/")}>
                <img className="Img-houm" src="/button-Houm.webp" alt="Home" />
                {/* Дом */}
        </button>
        <ExperienceBar/>
    </>
 );
};

export default Header