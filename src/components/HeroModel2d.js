import React from 'react';
import { Canvas } from '@react-three/fiber';  // Добавлен импорт Canvas
import PlayerModel from './PlayerModel'; // Убедитесь, что путь к компоненту PlayerModel правильный
import './HeroModel2d.css';

const HeroModel2d = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Canvas для 3D-модели */}
      <Canvas style={{ width: '300px', height: '300px' }}>
        <PlayerModel />
      </Canvas>

      {/* Изображение ниже 3D-модели */}
      {/* <img className='heroModelBox'
        src="/PlayerModel/hero.webp"
        alt="Player Model"
        // style={{ width: '1000px', height: '1000px', marginTop: '20px' }}
      /> */}
    </div>
  );
};

export default HeroModel2d;
