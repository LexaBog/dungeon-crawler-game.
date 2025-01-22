import React from 'react';

const Game = ({ characterId }) => {
    console.log(characterId)
    if (!characterId) {
        return <p>Загрузка игры...</p>;
    }
    

    return (
        <div>
           
        </div>
    );
};

export default Game;
