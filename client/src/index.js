import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Box from './components/TestBlocks.jsx';
import EdgeShape from './components/EdgeShape.jsx';
import Star from './components/Star.jsx';
import Starlink from './components/Starlink.jsx';

import * as THREE from 'three';

import { useRef, useState, useEffect } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });

import { Stars } from '@react-three/drei';

import { Suspense } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function vertex(point, radius) {
  const lambda = point[0] * Math.PI / 180;
  const phi = point[1] * Math.PI / 180;
  const cosPhi = Math.cos(phi);

  const x = radius * cosPhi * Math.cos(lambda);
  const y = radius * cosPhi * Math.sin(lambda);
  const z = radius * Math.sin(phi);

  return [x, y, z];
}

// // "Boba Tea" (https://skfb.ly/6UpwE) by Felix Yadomi is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
// function Asset({ url }) {
//   const gltf = useLoader(GLTFLoader, url)
//   const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(4));
//   return (<primitive object={gltf.scene} scale={0.025} position={[x, y, z]} />)
// };

// "Satellite" (https://skfb.ly/6XLMU) by MOJackal is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
function InstancedAsset({ url }) {
  const gltf = useLoader(GLTFLoader, url)
  const scene = gltf.scene.clone(true);
  // const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(4));
  var longitude = THREE.MathUtils.randFloatSpread(360);
  var latitude = THREE.MathUtils.randFloatSpread(180);

  var coordinates = [longitude, latitude];
  var vectorCoordinates = vertex(coordinates, 10);
  return (<primitive object={scene} scale={0.025} position={vectorCoordinates} />)
};

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
  // console.log(controls)
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
  const [isLoading, setIsLoading] = useState(true);
  const [starlinks, setStarlinks] = useState([]);
  const [selectedStarlink, setSelectedStarlink] = useState({});

  const getStarlinks = () => {
    axios.get('/starlinks')
      .then((result) => {
        console.log('result of get starlinks', result);
        setStarlinks(result.data.docs);
        setSelectedStarlink(result.data.docs[0]);
      })
      .catch((error) => {
        console.log('error getting starlinks from server!', error);
      })
  }

  useEffect(() => {
    getStarlinks();
    // setStarlinks("something");
    setIsLoading(false);
  }, []);

  return (
    <div id="main-canvas" onClick={() => { console.log('clicked') }}>
      <Canvas>
        {/* <Suspense fallback={null}>
          {Array(1).fill().map((element, index) => <InstancedAsset url="/assets/satellite (1)/scene.gltf" key={index} />)}
        </Suspense> */}
        {/* <Suspense fallback={null}>
          <Asset url="/assets/satellite 2/scene.gltf" />
        </Suspense>
        <Suspense fallback={null}>
          <Asset url="/assets/satellite 2/scene.gltf" />
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
        {/* {Array(50).fill().map((element, index) => <Starlink key={index} />)} */}
        {starlinks.map((starlink) => (
          <Starlink
            key={starlink.id}
            starlink={starlink}
            selectedStarlink={selectedStarlink}
            setSelectedStarlink={setSelectedStarlink}
          />)
        )}
        <gridHelper args={[10, 10, `white`, `gray`]} />
      </Canvas>
      <div id='testText'>WHY DOESN'T THIS SHOW UP. make "reset camera" button. </div>

      <main>

        <header>
          <h1>Blah</h1>
          <p>🚀 Blah blah blah!</p>
        </header>

        <blockquote>
          <p>Blah blah blah</p>
        </blockquote>

        <section className="left">
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

