import React, { useRef, useState } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });

import EdgeShape from './EdgeShape.jsx';

const CameraControls = () => {
  const [enabled, setEnabled] = useState(false);
  const controls = useRef();

  const {
    camera,
    gl: { domElement },
  } = useThree();

  useFrame(() => {
    controls.current.update();
  });

  return (
    <>
      <orbitControls
        ref={controls}
        args={[camera, domElement]}
        autoRotate={true}
        autoRotateSpeed={1}
        enableRotate={enabled ? true : false}
        enableZoom={false}
      />
      <EdgeShape setEnabled={setEnabled} />
    </>
  );
};

export default CameraControls;