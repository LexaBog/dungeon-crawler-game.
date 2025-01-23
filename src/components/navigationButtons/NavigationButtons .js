import React from "react";
import { useNavigate } from "react-router-dom";



const NavigationButtons  = () => {
    const navigate = useNavigate();

    return (
        <div>
            {/* <div className="boxNameUndLavel">
                <p>{characterId.name}</p>
                <p className="texStyleHeader">{characterId.level} level </p>
                <p className="texStyleHeader"> Опыт: {characterId.experience}</p>
            </div> */}
          
            <button onClick={() => navigate("/")}>
                Прокачка
            </button>
            <button onClick={() => navigate("/character")}>
                Персонаж
            </button>
            <button onClick={() => navigate("/")}>
                Магазик
            </button>
        </div>
    );
};

export default NavigationButtons 