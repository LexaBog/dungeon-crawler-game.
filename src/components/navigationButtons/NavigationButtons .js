import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavigationButtons.css"



const NavigationButtons  = () => {
    const navigate = useNavigate();
    
    return (
        <>
            {/* <div className="boxNameUndLavel">
                <p>{characterId.name}</p>
                <p className="texStyleHeader">{characterId.level} level </p>
                <p className="texStyleHeader"> Опыт: {characterId.experience}</p>
            </div> */}
          
            <button className="navigate-button" onClick={() => navigate("/")}>
                Прокачка
            </button>
            <button className="navigate-button" onClick={() => navigate("/character")}>
                Персонаж
            </button>
            <button className="navigate-button" onClick={() => navigate("/")}>
                Магазик
            </button>
        </>
    );
};

export default NavigationButtons 