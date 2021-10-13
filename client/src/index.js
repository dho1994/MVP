import React from 'react';
import ReactDOM from 'react-dom';
import Box from './components/TestBlocks.jsx';
import EdgeShape from './components/EdgeShape.jsx';

import * as THREE from 'three';

import { useRef, useState } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });

import { Suspense } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// "Boba Tea" (https://skfb.ly/6UpwE) by Felix Yadomi is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
function Asset({ url }) {
  const gltf = useLoader(GLTFLoader, url)
  return <primitive object={gltf.scene} scale={0.025} position={[2, -2, 0]}/>
};

function Background() {
  const { scene } = useThree();
  const loader = new THREE.TextureLoader();
  const texture = loader.load(
    "/assets/space.jpg"
  );
  // Set the scene background property to the resulting texture.
  scene.background = texture;
  return null;
}

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  // Ref to the controls, so that we can update them on every frame with useFrame
  const controls = useRef();
  useFrame(() => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      autoRotate={true}
      enableZoom={false}
    />
  );
};

function App() {
  return (
    <div id="main-canvas">
      {/* React App Test */}
      <Canvas>
        <Suspense fallback={null}>
          <Asset url="/assets/link_-_breath_of_the_wild/scene.gltf" />
        </Suspense>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {/* <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} /> */}
        <EdgeShape />
        <Background />
        <CameraControls />
      </Canvas>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('app'));

