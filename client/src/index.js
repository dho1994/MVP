import React from 'react';
import ReactDOM from 'react-dom';
import Box from './components/TestBlocks.jsx';

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {

// import { Suspense } from 'react'
// import { useLoader } from '@react-three/fiber'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// // "Boba Tea" (https://skfb.ly/6UpwE) by Felix Yadomi is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
// function Asset({ url }) {
//   const gltf = useLoader(GLTFLoader, url)
//   return <primitive object={gltf.scene} scale={0.5}/>
// };

function App() {

  return (
    <div>
      {/* React App Test */}
      <Canvas>
        {/* <Suspense fallback={<Box />}>
          <Asset url="/assets/boba/scene.gltf" />
        </Suspense> */}
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('app'));

