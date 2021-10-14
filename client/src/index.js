import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Box from './components/TestBlocks.jsx';
import EdgeShape from './components/EdgeShape.jsx';
import CameraControls from './components/CameraControls.jsx';
import Star from './components/Star.jsx';
// import Starlink from './components/Starlink.jsx';
import StarlinkContainer from './components/StarlinkContainer.jsx';
import SelectedSatelliteInfo from './components/SelectedSatelliteInfo.jsx';

import * as THREE from 'three';

import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'

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
function InstancedAsset({ url, orientation }) {
  const gltf = useLoader(GLTFLoader, url)
  const scene = gltf.scene.clone(true);
  // var longitude = THREE.MathUtils.randFloatSpread(360);
  // var latitude = THREE.MathUtils.randFloatSpread(180);

  const longitude = orientation === "left" ? -115 : 115;
  const latitude = orientation === "left" ? 65 : -65;
  var coordinates = [longitude, latitude];
  console.log(coordinates)
  var vectorCoordinates = vertex(coordinates, 10);
  return (<primitive object={scene} scale={0.05} position={vectorCoordinates} />)
};

function Background({ spaceTexture }) {
  const { scene } = useThree();
  // const loader = new THREE.TextureLoader();
  // const texture = loader.load(
  //   url
  // );
  // Set the scene background property to the resulting texture.
  scene.background = spaceTexture;
  return null;
}

// const onScrollFunc = () => {
//   console.log('scrolled');
//   const t = document.body.getBoundingClientRect().top;
//   const h = document.body.getBoundingClientRect().height;
//   // console.log(-t / h > 0.15);
//   // if (-t / h > 0.15) {
//   //   setShowIndicator(false);
//   //   console.log('hi')
//   // }
//   // console.log(document.body.getBoundingClientRect());
// }

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
  const [showIndicator, setShowIndicator] = useState(true);
  const [showStarlinkName, setShowStarlinkName] = useState(true);
  const spaceTexture = useMemo(() => new THREE.TextureLoader().load("/assets/space dark.jpg"), []);

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
    setIsLoading(false);
  }, []);

  useEffect(() => {
    document.body.onscroll = () => {
      console.log('scrolled');
      const t = document.body.getBoundingClientRect().top;
      const h = document.body.getBoundingClientRect().height;
      // console.log(-t / h > 0.1);
      if (t < 0) {
        setShowStarlinkName(false);
        console.log('set show starlink name to false')
      } else {
        setShowStarlinkName(true);
        console.log('set show starlink name to true')
      }
      if (-t / h > 0.1) {
        setShowIndicator(false);
        console.log('set show indicator to false')
      } else {
        setShowIndicator(true);
        console.log('set show indicator to true')
      }
    }
  }, []);

  return (
    <div id="main-canvas" onClick={() => { console.log('clicked') }} >
      <Canvas>
        <Suspense fallback={null}>
          {/* {Array(3).fill().map((element, index) => <InstancedAsset url="/assets/satellite (1)/scene.gltf" key={index} />)} */}
          <InstancedAsset url="/assets/satellite (1)/scene.gltf" orientation="left" />
          <InstancedAsset url="/assets/satellite (1)/scene.gltf" orientation="right" />
        </Suspense>
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
        {/* <EdgeShape /> */}
        <Background spaceTexture={spaceTexture} />
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
        <StarlinkContainer
          starlinks={starlinks}
          selectedStarlink={selectedStarlink}
          setSelectedStarlink={setSelectedStarlink}
          showStarlinkName={showStarlinkName}
        />
        {/* <gridHelper args={[10, 10, `white`, `gray`]} /> */}
        {/* <sprite>
          <sphereGeometry args={[0.5, 6, 6]} />
          <spriteMaterial color="rgb(223,115,255)" wireframe={true} />
        </sprite> */}
      </Canvas>
      <>
        {showIndicator
          ? (
            // <div id='indicator-text'>Scroll for more</div>
            <img
              id='indicator-arrow'
              src="/assets/icons8-chevron-100.png"
            />
          )
          : null
        }
      </>
      <SelectedSatelliteInfo isLoading={isLoading} selectedStarlink={selectedStarlink} key={selectedStarlink.id} />
      <main>
        <h1 id="header-main">FASTER THAN THE SPEED OF LIGHT</h1>
        {/* <h1 id="header-sub">Join the Waiting List</h1> */}
        <h1 id="header-sub"><a href="https://www.starlink.com/">Order Now</a></h1>
        {/* <header>
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
        </blockquote> */}

      </main>

    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('app'));

