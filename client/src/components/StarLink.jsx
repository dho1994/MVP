import ReactDOM from 'react-dom'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

import * as THREE from 'three';

// Helper function for converting coordinates [longitude, latitude] into a THREE.Vector3 in (x, y, z) plane
// Points will be positioned according to a given radius from the center
function vertex(point, radius) {
  const lambda = point[0] * Math.PI / 180;
  const phi = point[1] * Math.PI / 180;
  const cosPhi = Math.cos(phi);

  const x = radius * cosPhi * Math.cos(lambda);
  const y = radius * cosPhi * Math.sin(lambda);
  const z = radius * Math.sin(phi);

  return new THREE.Vector3(x, y, z);
}

function Starlink(props) {
  const ref = useRef();
  const [hovered, setHover] = useState(false);

  const color = new THREE.Color();

  const coordinates = [props.starlink.longitude, props.starlink.latitude];
  const vectorCoordinates = vertex(coordinates, 50);
  // console.log(vectorCoordinates);

  useFrame((state, delta) => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
    ref.current.rotation.z += 0.01;
    // ref.current.material.color.lerp(color.set(hovered ? "darkTurquoise" : "black").convertSRGBToLinear(), hovered ? 0.1 : 0.05)
  })

  return (
    <mesh
      ref={ref}
      position={vectorCoordinates}
      onPointerOver={(event) => { setHover(true); props.setSelectedStarlink(props.starlink); }}
      // onPointerOver={(event) => { setHover(true); }}
      onPointerOut={(event) => { setHover(false); }}
    >
      {
        props.selectedStarlink.id === props.starlink.id
          ? (
            <>
              <sphereGeometry args={[0.5, 6, 6]} />
              <meshStandardMaterial color="salmon" wireframe={true} />
            </>
          )
          : (
            <>
              <octahedronGeometry args={[0.5]} />
              <meshStandardMaterial color="black" wireframe={true} />
            </>
          )
      }
    </mesh >
  )
}

export default Starlink;