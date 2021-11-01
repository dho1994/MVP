# Starlink Tracker

![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![javascript](https://img.shields.io/badge/JavaScript-20232A?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Threejs](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)
![node.js](https://img.shields.io/badge/Node.js-20232A?style=for-the-badge&logo=nodedotjs&logoColor=green)
![Express](https://img.shields.io/badge/-Express-20232A?style=for-the-badge&logo=express&logoColor=yellow)
![Webpack](https://img.shields.io/badge/-webpack-20232A?style=for-the-badge&logo=webpack&logoColor=blueviolet)
![Babel](https://img.shields.io/badge/-Babel-20232A?style=for-the-badge&logo=babel&logoColor=yellow)

This project was a personal challenge to learn new technologies (`three.js` and `react-three-fiber`) and build an application in under three days.

Starlink Tracker tracks real-time data of Starlink satellites and positions them in the 3D world based on their latitude/longitude coordinates in a fixed orbit around the center. 

<p
  align="center">
  <img
    alt="starlink tracker demo" src="client/demo/Starlink GIF Shortened Compressed GIF (high).gif">
</p>

## Installation
1. Install dependencies
   ```sh
   npm install
   ```
   
2. Run 
   ```sh
   npm start
   ```

## Features

### Click, Hover, Drag
 - Information for the selected Starlink satellite will be displayed. Hover over another Starlink to change selections.
 - Click and drag the center object to point the camera to another part of the world.
 - Scroll down for more visual effects.
 - Click either of the two 3D satellite models for an easter egg!

## Future Plans
Some ideas I'd like to implement in the future:
 - Overlays with instructions on how to interact with the application - one for each feature.
 - Allow users to toggle through additional sets of Starlink satellites using forward/back buttons.
 - Option for users to render any number of Starlink satellites at a time (via slider bar)
