import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import CharacterInfo from "./components/CharacterInfo.js";
import Game from "./components/Game.js";
import "./App.css";

function App({ telegramId, username }) {
    const [character, setCharacter] = useState(null);

    const handleCharacterLoaded = (data) => {
        setCharacter(data); // Сохраняем данные персонажа
    };

    return (
        <div className="ollGameBody">
            <div className="header">
                <h1 className="headerText">Dungeons s Heroes</h1>
            </div>

            {/* Передача данных через маршруты */}
            <Routes>
                <Route
                    path="/"
                    element={
                        <CharacterInfo
                            telegramId={telegramId} username={username}
                        />
                    }
                />
                <Route
                    path="/game"
                    element={<Game character={character} />}
                />
            </Routes>

            <div className="futer"></div>
        </div>
    );
}

export default App;
