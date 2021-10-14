import ReactDOM from 'react-dom'
import React from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import axios from 'axios';

import * as THREE from 'three';

import Starlink from './Starlink.jsx';
import { useRef, useState, useEffect } from 'react'


function StarlinkContainer(props) {
  const { starlinks, selectedStarlink, setSelectedStarlink, showStarlinkName } = props;

  return (
    <>
      {starlinks.map((starlink, index) => (
        <Starlink
          key={index}
          starlink={starlink}
          selectedStarlink={selectedStarlink}
          setSelectedStarlink={setSelectedStarlink}
          showStarlinkName={showStarlinkName}
        />)
      )}
    </>
  )
}

export default StarlinkContainer;