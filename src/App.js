import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CharacterCreationForm from './components/CharacterCreationForm.js'


// import Dungeon from './components/Dungen';
import './App.css';

const API_URL = "http://localhost:5001/api"; // Укажи URL своего API

function App() {

  return (
    <div className="ollGameBody">
            <div>
              <h1 className='header'>Dungeons s Heroes</h1>
            </div>
            <Routes>
                <Route path="/" element={<CharacterCreationForm />} />
                {/* <Route path="/game" element={<Game />} /> */}
            </Routes>         
      <div className='futer'></div>
    </div>
  );
}

export default App;
