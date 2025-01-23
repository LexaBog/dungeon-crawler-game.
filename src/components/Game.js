import React from 'react';
import NavigationButtons from './navigationButtons/NavigationButtons ';

import './game.css'

const Game = (characterId) => {
    // const navigate = useNavigate();

    return (
        <div>
            {/* <div className="boxNameUndLavel">
                <p>{characterId.name}</p>
                <p className="texStyleHeader">{characterId.level} level </p>
                <p className="texStyleHeader"> Опыт: {characterId.experience}</p>
            </div> */}
            <NavigationButtons/>
          
        </div>
    );
};

export default Game;
