import React, { Suspense, useState, useEffect } from 'react';

import InstancedSatellite from './InstancedSatellite.jsx';

const audio = new Audio("/assets/Borrtex - Changing.mp3");

const toggleAudio = () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function Satellites() {
  const [music, setMusic] = useState(false);
  const [hovered, setHover] = useState(false);

  useEffect(() => {
    if (audio.readyState === 0) {
      setMusic(false);
    } else {
      if (music) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [music]);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  return (
    <Suspense fallback={null}>
      <InstancedSatellite
        orientation="left"
        url="/assets/satellite/scene.gltf"
        music={music}
        setMusic={setMusic}
        setHover={setHover}
      />
      <InstancedSatellite
        orientation="right"
        url="/assets/satellite/scene.gltf"
        music={music}
        setMusic={setMusic}
        setHover={setHover}
      />
    </Suspense>
  )
}

export default Satellites;