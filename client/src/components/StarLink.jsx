import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei';
import * as THREE from 'three';

import vertex from '../helpers/vertex.js';

function Starlink(props) {
  const [hovered, setHover] = useState(false);
  const ref = useRef();
  const {
    starlink,
    selectedStarlink,
    setSelectedStarlink,
    showStarlinkName
  } = props;

  const color = new THREE.Color();

  const coordinates = [starlink.longitude, starlink.latitude];
  const vectorCoordinates = vertex(coordinates, 50);

  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
    ref.current.rotation.z += 0.01;
  })

  return (
    <mesh
      ref={ref}
      position={vectorCoordinates}
      onPointerOver={() => {
        setHover(true);
        setSelectedStarlink(starlink);
      }}
      onPointerOut={() => setHover(false)}
    >
      {
        selectedStarlink.id === starlink.id
          ? (
            <>
              <sphereGeometry args={[0.5, 6, 6]} />
              <meshStandardMaterial color="rgb(223,115,255)" wireframe={true} />
              {showStarlinkName
                ? (<Html position={[0, 0, 0]}>
                  <div id="selected-satellite-name-floating">{selectedStarlink.spaceTrack.OBJECT_NAME}</div>
                </Html>)
                : null
              }

            </>
          )
          : (
            <>
              <octahedronGeometry args={[0.5]} />
              <meshStandardMaterial color="rgb(0,255,239)" wireframe={true} />
            </>
          )
      }
    </mesh >
  )
}

export default Starlink;