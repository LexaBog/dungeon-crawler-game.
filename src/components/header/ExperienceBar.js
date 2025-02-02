// src/components/ExperienceBar.js
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTotalXPForNextLevel, getXPPercentage } from "../../utils/xpUtils";
import "./ExperienceBar.css"; // создайте стили для компонента


const ExperienceBar = () => {
    // Предположим, что в Redux вы храните данные персонажа в state.character.data
    const character = useSelector((state) => state.character.data);
    
    if (!character) return null;
    
    // Здесь предполагается, что character.experience – это опыт, накопленный для текущего уровня
    const currentXP = character.experience;
    const requiredXP = getTotalXPForNextLevel(character.level);
    const percentage = getXPPercentage(currentXP, character.level);
  
    return (
      <div className="experience-bar">
        <div className="experience-bar__inner" style={{ width: `${percentage}%` }}>
          <span className="experience-bar__text">
            {currentXP} / {requiredXP} XP ({percentage}%)
          </span>
        </div>
      </div>
    );
  };
  
  export default ExperienceBar;
