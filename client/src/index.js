import React, { useState, useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom';
import { Canvas, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import axios from 'axios';

import CameraControls from './components/CameraControls.jsx';
import Satellites from './components/Satellites.jsx';
import Starlink from './components/Starlink.jsx';
import SelectedStarlinkInfo from './components/SelectedStarlinkInfo.jsx';
import Fade from './components/Fade.jsx';

function Background({ texture }) {
  const { scene } = useThree();
  scene.background = texture;
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
        setStarlinks(result.data.docs);
        setSelectedStarlink(result.data.docs[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('error getting starlinks from server!', error);
      })
  }

  useEffect(() => {
    getStarlinks();
  }, []);

  useEffect(() => {
    document.body.onscroll = () => {
      const t = document.body.getBoundingClientRect().top;
      const h = document.body.getBoundingClientRect().height;
      if (t < 0) {
        setShowStarlinkName(false);
      } else {
        setShowStarlinkName(true);
      }
      if (-t / h > 0.1) {
        setShowIndicator(false);
      } else {
        setShowIndicator(true);
      }
    }
  }, []);

  return (
    <div id="main-canvas" >
      <Canvas>
        <Satellites />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Background texture={spaceTexture} />
        <CameraControls />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
        />
        {starlinks.map((starlink, index) => (
          <Starlink
            key={index}
            starlink={starlink}
            selectedStarlink={selectedStarlink}
            setSelectedStarlink={setSelectedStarlink}
            showStarlinkName={showStarlinkName}
          />)
        )}
      </Canvas>
      <>
        {showIndicator
          ? (
            <img id='indicator-arrow' src="/assets/icons8-chevron-100.png" />
          )
          : null
        }
      </>
      <SelectedStarlinkInfo
        isLoading={isLoading}
        selectedStarlink={selectedStarlink}
        key={selectedStarlink.id}
      />
      <main>
        <div id="faster-container">
          <Fade>
            <h1 id="header-main">FASTER THAN THE SPEED OF LIGHT</h1>
          </Fade>
        </div>
        <div id="order-container">
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
      </main>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
