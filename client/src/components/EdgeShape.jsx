import ReactDOM from 'react-dom'
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function EdgeShape(props) {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    ref.current.rotation.x += hovered ? 0.01 : 0.01;
    ref.current.rotation.y += hovered ? 0.01 : 0.01;
    ref.current.rotation.z += hovered ? 0.01 : 0.01;
    // const b = document.body.getBoundingClientRect().bottom;
    // ref.current.position.z = b * 0.01

    const b = document.body.getBoundingClientRect().top;
    // console.log(b)
    ref.current.scale.x = Math.max(1, -b * 0.01);
    ref.current.scale.y = Math.max(1, -b * 0.01);
    ref.current.scale.z = Math.max(1, -b * 0.01);
  })

  // useEffect(() => {
  //   document.body.style.cursor = hovered ? 'pointer' : 'auto'
  // }, [hovered])

  return (
    <mesh
      // {...props}
      ref={ref}
      scale={active ? 1 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <sphereGeometry args={[1, 6, 3]} />
      <meshStandardMaterial wireframe={true} />
      {/* <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} /> */}
    </mesh>
  )
}

export default EdgeShape;