import React from 'react';


const Game = ({ characterId }) => {
    console.log(characterId)
    if (!characterId) {
        return <p>Загрузка игры...</p>;
    }
    

    return (
        <div>
            <div className="boxNameUndLavel">
                <p>{characterId.name}</p>
                <p className="texStyleHeader">{characterId.level} level </p>
                <p className="texStyleHeader"> Опыт: {characterId.experience}</p>
            </div>
           
        </div>
    );
};

export default Game;
