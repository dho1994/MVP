import ReactDOM from 'react-dom'
import React from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import axios from 'axios';

import * as THREE from 'three';

import Starlink from './Starlink.jsx';
import { useRef, useState, useEffect } from 'react'


function StarlinkContainer(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [starlinks, setStarlinks] = useState([]);
  const [selectedStarlink, setSelectedStarlink] = useState({});

  const getStarlinks = () => {
    axios.get('/starlinks')
      .then((result) => {
        console.log('result of get starlinks', result);
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

  return (
    <>
      {starlinks.map((starlink, index) => (
        <Starlink
          key={index}
          starlink={starlink}
          selectedStarlink={selectedStarlink}
          setSelectedStarlink={setSelectedStarlink}
        />)
      )}
    </>
  )
}

export default StarlinkContainer;