import React from 'react';
import { useNavigate } from "react-router-dom";

const Game = (characterId) => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="boxNameUndLavel">
                <p>{characterId.name}</p>
                <p className="texStyleHeader">{characterId.level} level </p>
                <p className="texStyleHeader"> Опыт: {characterId.experience}</p>
            </div>
            <button onClick={() => navigate("/dangeon")}>
                Прокачка
            </button>
            <button onClick={() => navigate("/character")}>
                Персонаж
            </button>
            <button>
                Магазик
            </button>
        </div>
    );
};

export default Game;
