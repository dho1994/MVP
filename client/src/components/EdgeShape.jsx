import ReactDOM from 'react-dom'
import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three';

function EdgeShape(props) {
  const [hovered, setHover] = useState(false);
  const ref = useRef();
  const { setEnabled } = props;

  const color = new THREE.Color();

  useFrame(() => {
    const rotationFrame = hovered ? -0.0025 : 0.005;
    ref.current.rotation.x += rotationFrame;
    ref.current.rotation.y += rotationFrame;
    ref.current.rotation.z += rotationFrame;

    const t = document.body.getBoundingClientRect().top;
    const scaleFrame = Math.max(1, -t * 0.004);
    ref.current.scale.x = scaleFrame;
    ref.current.scale.y = scaleFrame;
    ref.current.scale.z = scaleFrame;

    ref.current.material.color.lerp(color.set(hovered ? "darkTurquoise" : "white").convertSRGBToLinear(), hovered ? 0.1 : 0.05)
  })

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  return (
    <mesh
      ref={ref}
      scale={1}
      onPointerOver={() => {
        setHover(true);
        setEnabled(true);
      }}
      onPointerOut={() => {
        setHover(false);
        setEnabled(false);
      }}
    >
      <sphereGeometry args={[1, 6, 3]} />
      <meshStandardMaterial wireframe={true} />
    </mesh>
  )
}

export default EdgeShape;