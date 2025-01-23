import React from 'react';
import './game.css'

const Game = (characterId) => {
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
    </>
 );
};

export default Game