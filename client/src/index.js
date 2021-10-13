import React from 'react';
import ReactDOM from 'react-dom';
import Box from './components/TestBlocks.jsx';
import EdgeShape from './components/EdgeShape.jsx';
import Star from './components/Star.jsx';

import * as THREE from 'three';

import { useRef, useState } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });

import { Stars } from '@react-three/drei';

import { Suspense } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// // "Boba Tea" (https://skfb.ly/6UpwE) by Felix Yadomi is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
// function Asset({ url }) {
//   const gltf = useLoader(GLTFLoader, url)
//   return <primitive object={gltf.scene} scale={0.025} position={[2, -2, 0]} />
// };

function Background() {
  const { scene } = useThree();
  const loader = new THREE.TextureLoader();
  const texture = loader.load(
    "/assets/space dark.jpg"
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
      // enablePan={true}
      enableRotate={true}
      enableZoom={false}
    />
  );
};

// document.body.onscroll = () => { console.log('scrolled') }

const Reposition = () => {
  const { camera } = useThree();

  useFrame(() => {
    const b = document.body.getBoundingClientRect().bottom;
    camera.position.z = Math.min(0, b * -0.01);
    camera.position.x = b * -0.002;
    camera.position.y = b * -0.002;
    console.log(camera.position.x, camera.position.y, camera.position.z)
  });
  return null;
}

function App() {
  return (
    <div id="main-canvas" onClick={() => { console.log('clicked') }}>
      <Canvas>
        {/* <Suspense fallback={null}>
          <Asset url="/assets/link_-_breath_of_the_wild/scene.gltf" />
        </Suspense> */}
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {/* <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} /> */}
        <EdgeShape />
        <Background />
        <CameraControls />
        {/* {Array(2000).fill().map((element, index) => <Star key={index}/>)} */}
        <Stars
          radius={100} // Radius of the inner sphere (default=100)
          depth={50} // Depth of area where stars should fit (default=50)
          count={5000} // Amount of stars (default=5000)
          factor={4} // Size factor (default=4)
          saturation={0} // Saturation 0-1 (default=0)
          fade // Faded dots (default=false)
        />
        {/* <Reposition /> */}
      </Canvas>
      <main>

        <header>
          <h1>Blah</h1>
          <p>🚀 Blah blah blah!</p>
        </header>

        <blockquote>
          <p>Blah blah blah</p>
        </blockquote>

        <section class="left">
          <h2>Blah</h2>

          <h3>Blah</h3>
          <p>
            Blah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blah
          </p>
          <h3>Blah</h3>
          <p>
            Blah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blah
          </p>
          <h3>Blah</h3>
          <p>
            Blah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blah
          </p>

        </section>


        <blockquote>
          <p>Thanks for watching!</p>
        </blockquote>

      </main>

    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('app'));

