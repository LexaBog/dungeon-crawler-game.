import React, { useRef } from 'react';
import { useLoader, extend } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

extend({ OBJLoader });

const PlayerModel = () => {
  const obj = useLoader(OBJLoader, '/PlayerModel/obj file.obj');
  const modelRef = useRef();


  return (
    <group ref={modelRef} scale={[0.2, 0.2, 0.2]} position={[0.01, 1, 0]}>
      <primitive object={obj} />
    </group>
   );
};

export default PlayerModel;
