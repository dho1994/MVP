import React from 'react'
import { useRef, useState, useEffect } from 'react'

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'

extend({ OrbitControls });

import EdgeShape from './EdgeShape.jsx';

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  const [enabled, setEnabled] = useState(false);

  // Ref to the controls, so that we can update them on every frame with useFrame
  const controls = useRef();
  useFrame(() => {
    controls.current.update();
    // console.log(camera.position)
  });
  // console.log(controls)
  return (
    <>
      <orbitControls
        ref={controls}
        args={[camera, domElement]}
        autoRotate={true}
        autoRotateSpeed={1}
        // enablePan={true}
        enableRotate={enabled ? true : false}
        enableZoom={false}
      />
      <EdgeShape setEnabled={setEnabled} />
    </>
  );
};

export default CameraControls;