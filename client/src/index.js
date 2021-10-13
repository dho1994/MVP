import React from 'react';
import ReactDOM from 'react-dom';
import Box from './components/TestBlocks.jsx';
import EdgeShape from './components/EdgeShape.jsx';

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

// "Boba Tea" (https://skfb.ly/6UpwE) by Felix Yadomi is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
function Asset({ url }) {
  const gltf = useLoader(GLTFLoader, url)
  return <primitive object={gltf.scene} scale={0.025} position={[2, -2, 0]} />
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
      // enablePan={true}
      enableRotate={true}
      enableZoom={false}
    />
  );
};

function moveCamera() {
  // calculate where the user is currently scrolled to/at
  const t = document.body.getBoundingClientRect().top;
  console.log(document.body.getBoundingClientRect());
  console.log(test);

  // change properties on 3D objects whenever this function is called

  // Rotate the moon
  // moon.rotation.x += 0.05;
  // moon.rotation.y += 0.075;
  // moon.rotation.z += 0.05;

  // Position the camera (top value "t" will always be negative)
  // camera.position.z = t * -0.01;
  // camera.position.x = t * -0.0002;
  // camera.position.y = t * -0.0002;

}

// document.body.onscroll = () => { Reposition() }
// const Reposition = () => {
//   console.log('test')
//   return null;
// }

document.body.onscroll = () => { console.log('scrolled') }

const Reposition = () => {
  const { camera } = useThree();

  useFrame(() => {
    const t = document.body.getBoundingClientRect().top;
    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
  });

  // useThree(({ camera }) => {
  //   const t = document.body.getBoundingClientRect().top;
  //   console.log(document.body.getBoundingClientRect());
  //   camera.position.z = t * -0.01;
  //   camera.position.x = t * -0.0002;
  //   camera.position.y = t * -0.0002;
  // });
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
        <Stars
          radius={100} // Radius of the inner sphere (default=100)
          depth={50} // Depth of area where stars should fit (default=50)
          count={5000} // Amount of stars (default=5000)
          factor={4} // Size factor (default=4)
          saturation={0} // Saturation 0-1 (default=0)
          fade // Faded dots (default=false)
        />
        <Reposition />
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

