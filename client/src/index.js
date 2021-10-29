import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import EdgeShape from './components/EdgeShape.jsx';
import CameraControls from './components/CameraControls.jsx';
import Star from './components/Star.jsx';
import Satellites from './components/Satellites.jsx';
import StarlinkContainer from './components/StarlinkContainer.jsx';
import SelectedStarlinkInfo from './components/SelectedStarlinkInfo.jsx';
import Fade from './components/Fade.jsx';

import * as THREE from 'three';

import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'

import { Stars } from '@react-three/drei';

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
        // console.log('result of get starlinks', result);
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
      // console.log('scrolled');
      const t = document.body.getBoundingClientRect().top;
      const h = document.body.getBoundingClientRect().height;
      // console.log(-t / h > 0.1);
      if (t < 0) {
        setShowStarlinkName(false);
        // console.log('set show starlink name to false')
      } else {
        setShowStarlinkName(true);
        // console.log('set show starlink name to true')
      }
      if (-t / h > 0.1) {
        setShowIndicator(false);
        // console.log('set show indicator to false')
      } else {
        setShowIndicator(true);
        // console.log('set show indicator to true')
      }

      // console.log(t);
      // if (currentScroll <= checkpoint) {
      //   opacity = 1 - currentScroll / checkpoint;
      // } else {
      //   opacity = 0;
      // }
      // document.querySelector(".front").style.opacity = opacity;
    }
  }, []);

  return (
    <div id="main-canvas" >
      <Canvas>
        <Satellites />
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
      <SelectedStarlinkInfo isLoading={isLoading} selectedStarlink={selectedStarlink} key={selectedStarlink.id} />
      <main>
        {/* <h1 id="header-main">FASTER THAN THE SPEED OF LIGHT</h1> */}
        {/* <h1 id="header-main">
          <Fade>
            FASTER THAN THE SPEED OF LIGHT
          </Fade>
        </h1> */}
        <div id="faster-container">
          <Fade>
            <h1 id="header-main">FASTER THAN THE SPEED OF LIGHT</h1>
          </Fade>
        </div>
        {/* <h1 id="header-sub-wait">Join the Waiting List</h1> */}
        <div id="order-container">
          {/* <h1 id="header-sub-order">
            <a href="https://www.starlink.com/">Order Now</a>
          </h1> */}
          <Fade>
            <a href="https://www.starlink.com/">
              <img
                id='starlink-logo'
                src="/assets/Starlink_Logo.svg"
                alt="Logo of Starlink - Date 21 August 2019 - www.starlink.com - SpaceX (Public domain, via Wikimedia Commons)"
              />
            </a>
          </Fade>
        </div>
        {/* <WaitlistForm /> */}
      </main>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('app'));

