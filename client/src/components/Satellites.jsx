import React from 'react';
import { useRef, useState, useEffect, useMemo } from 'react'

import { useLoader } from '@react-three/fiber'
import { Suspense } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const audio = new Audio("/assets/Borrtex - Changing.mp3");

const toggleAudio = () => {
  if (audio.paused) {
    audio.play();
    console.log('audio playing')
  } else {
    audio.pause();
    console.log('audio paused')
  }
}

// "Satellite" (https://skfb.ly/6XLMU) by MOJackal is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
function InstancedSatellite({ url, orientation, music, setMusic }) {
  const gltf = useLoader(GLTFLoader, url)
  const scene = gltf.scene.clone(true);
  // var longitude = THREE.MathUtils.randFloatSpread(360);
  // var latitude = THREE.MathUtils.randFloatSpread(180);

  const longitude = orientation === "left" ? -115 : 115;
  const latitude = orientation === "left" ? 65 : -65;
  var coordinates = [longitude, latitude];
  // console.log(coordinates)
  var vectorCoordinates = vertex(coordinates, 10);
  return (<primitive object={scene} scale={0.05} position={vectorCoordinates} onClick={() => { setMusic(!music) }} />)
};

function vertex(point, radius) {
  const lambda = point[0] * Math.PI / 180;
  const phi = point[1] * Math.PI / 180;
  const cosPhi = Math.cos(phi);

  const x = radius * cosPhi * Math.cos(lambda);
  const y = radius * cosPhi * Math.sin(lambda);
  const z = radius * Math.sin(phi);

  return [x, y, z];
}

function Satellites(props) {
  const [music, setMusic] = useState(false);

  useEffect(() => {
    // console.log(audio.readyState);
    if (audio.readyState === 0) {
      setMusic(false);
      console.log('music not ready to play yet. set "playing" to false.')
    } else {
      if (music) {
        audio.play();
        console.log('music playing');
      } else {
        audio.pause();
        console.log('music stopped');
      }
    }
  }, [music]);

  return (
    <Suspense fallback={null}>
      {/* {Array(3).fill().map((element, index) => <InstancedSatellite url="/assets/satellite/scene.gltf" key={index} />)} */}
      <InstancedSatellite url="/assets/satellite/scene.gltf" orientation="left" music={music} setMusic={setMusic} />
      <InstancedSatellite url="/assets/satellite/scene.gltf" orientation="right" music={music} setMusic={setMusic} />
    </Suspense>
  )
}

export default Satellites;