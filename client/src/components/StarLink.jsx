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

// Helper function for generating a random number with fixed significant digits
function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

function StarLink(props) {
  const ref = useRef();
  // const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  // const x = THREE.MathUtils.randFloatSpread(1000);
  // const y = THREE.MathUtils.randFloatSpread(1000);
  // const z = THREE.MathUtils.randFloat(80, 100);
  // const x = THREE.MathUtils.randFloat(0, 100);
  // const y = THREE.MathUtils.randFloat(0, 100);
  // const z = THREE.MathUtils.randFloat(0, 100);

  // const randomX = THREE.MathUtils.randFloat(0, 100);
  // const randomY = THREE.MathUtils.randFloat(0, 100);
  // const randomZ = THREE.MathUtils.randFloat(10, 100);

  // const x = Math.random() > 0.5 ? randomX : -randomX;
  // const y = Math.random() > 0.5 ? randomY : -randomY;
  // const z = Math.random() > 0.5 ? randomZ : -randomZ;
  // console.log(x, y, z);

  // const x = Math.random() > 0.5 ? 10 : -10;
  // const y = Math.random() > 0.5 ? 10 : -10;
  // const z = Math.random() > 0.5 ? 10 : -10;

  // Returns a random number between -n/2 and +n/2
  var longitude = THREE.MathUtils.randFloatSpread(360);
  var latitude = THREE.MathUtils.randFloatSpread(180);

  var coordinates = [longitude, latitude];
  var vectorCoordinates = vertex(coordinates, 50);
  // console.log(vectorCoordinates);

  useFrame((state, delta) => {
    // ref.current.position.x += 0.01;
    // ref.current.position.y += 0.01;
    // ref.current.position.z += 0.01;
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
    ref.current.rotation.z += 0.01;
  })
  return (
    <mesh
      ref={ref}
      // position={[x, y, z]}
      // position={new THREE.Vector3().setFromSphericalCoords(10, 360, 360)}
      position={vectorCoordinates}
    >
      <sphereGeometry args={[0.5, 24, 24]} />
      <meshStandardMaterial color="white" />
    </mesh>
  )
}

export default StarLink;