import React from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";



const NavigationButtons  = () => {
    const navigate = useNavigate();

    return (
        <Routes>
            {/* <div className="boxNameUndLavel">
                <p>{characterId.name}</p>
                <p className="texStyleHeader">{characterId.level} level </p>
                <p className="texStyleHeader"> Опыт: {characterId.experience}</p>
            </div> */}
          
            <Routes onClick={() => navigate("/")}/>
                Прокачка
            
            <Routes onClick={() => navigate("/character")}/>
                Персонаж
            
            <Routes onClick={() => navigate("/")}/>
                Магазик
            
        </Routes>
    );
};

export default NavigationButtons 