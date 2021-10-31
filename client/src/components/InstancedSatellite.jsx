import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import vertex from '../helpers/vertex.js';

// "Satellite" (https://skfb.ly/6XLMU) by MOJackal is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
function InstancedSatellite({ url, orientation, music, setMusic, setHover }) {
  const gltf = useLoader(GLTFLoader, url)
  const scene = gltf.scene.clone(true);

  const longitude = orientation === "left" ? -115 : 115;
  const latitude = orientation === "left" ? 65 : -65;
  var coordinates = [longitude, latitude];
  var vectorCoordinates = vertex(coordinates, 10);

  return (
    <group>
      <primitive object={scene} scale={0.05} rotation={[-0.5, 0, 0]} position={vectorCoordinates} />
      <mesh
        position={vectorCoordinates}
        onClick={() => setMusic(!music)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <boxGeometry args={[1, 0.5, 0.5]} />
        <meshStandardMaterial transparent={true} opacity={0} />
      </mesh>
    </group>
  )
};

export default InstancedSatellite;
