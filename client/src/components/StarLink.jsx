import ReactDOM from 'react-dom'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

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

function Asset({ url }) {
  const gltf = useLoader(GLTFLoader, url)
  var longitude = THREE.MathUtils.randFloatSpread(360);
  var latitude = THREE.MathUtils.randFloatSpread(180);

  var coordinates = [longitude, latitude];
  var vectorCoordinates = vertex(coordinates, 50);
  return (<primitive object={gltf.scene} scale={2.5} position={vectorCoordinates} />)
};

function Starlink(props) {
  const ref = useRef();
  const [hovered, setHover] = useState(false);

  const color = new THREE.Color();

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

  // // Returns a random number between -n/2 and +n/2
  // var longitude = THREE.MathUtils.randFloatSpread(360);
  // var latitude = THREE.MathUtils.randFloatSpread(180);
  // var coordinates = [longitude, latitude];

  const coordinates = [props.starlink.longitude, props.starlink.latitude];
  const vectorCoordinates = vertex(coordinates, 50);
  // console.log(vectorCoordinates);

  useFrame((state, delta) => {
    // ref.current.position.x += 0.01;
    // ref.current.position.y += 0.01;
    // ref.current.position.z += 0.01;
    // console.log(ref.current)
    if (ref.current !== null) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
      ref.current.rotation.z += 0.01;
      ref.current.material.color.lerp(color.set(hovered ? "darkTurquoise" : "black").convertSRGBToLinear(), hovered ? 0.1 : 0.05)
    }
  })

  props.selectedStarlink.id === props.starlink.id ? console.log(props.selectedStarlink.spaceTrack.OBJECT_NAME, props.selectedStarlink.latitude, props.selectedStarlink.longitude) : null;

  return (
    <>
      {props.selectedStarlink.id === props.starlink.id
        ? (
          <Suspense fallback={null}>
            <Asset url="/assets/satellite (1)/scene.gltf" />
          </Suspense>
        )
        : (
          <mesh
            ref={ref}
            // position={[x, y, z]}
            // position={new THREE.Vector3().setFromSphericalCoords(10, 360, 360)}
            position={vectorCoordinates}
            onPointerOver={(event) => { setHover(true); props.setSelectedStarlink(props.starlink);}}
            onPointerOut={(event) => { setHover(false); }}
          >
            {/* <sphereGeometry args={[0.5, 24, 24]} /> */}
            <octahedronGeometry args={[0.5]} />
            <meshStandardMaterial color="black" wireframe={true} />
          </mesh >
        )}
    </>
  )
}

export default Starlink;