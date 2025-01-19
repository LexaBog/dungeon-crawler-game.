import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CharacterInfo from "./components/CharacterInfo.js";
import authService from "./components/authService.js"
import {fetchCharacter} from "./components/authService.js"
import axios from 'axios';
import Game from "./components/Game.js";
import "./App.css";


function App({ telegramId, username,}) {
    const [telegramId, setTelegramId] = useState(null);
    console.log('проверка айди в апп', telegramId)

    //вытягиваю айди из дочернего компонента
    const takeIDfromChold =(data) => {
        setTelegramId(data.telegramId);
    }
   
    return (
        <div className="ollGameBody">
            <div className="header">
                <h1 className="headerText">Dungeons s Heroes</h1>
            </div>

            <div>
                <h2>Добро пожаловать, {character.name}!</h2>
                <p>Ваш уровень: {character.level}</p>
                {/* Отображайте остальные данные персонажа */}
            </div>

            Передача данных через маршруты
            <authService takeIDfromChold={takeIDfromChold}/>
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
