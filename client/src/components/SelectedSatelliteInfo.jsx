import React from 'react'



function SelectedSatelliteInfo(props) {
  const { isLoading, selectedStarlink } = props;
  return (
    <>
      {isLoading
        ? null
        : (
          <div id='selected-satellite-info'>
            <div className='selected-satellite-details'><b>{selectedStarlink.spaceTrack === undefined ? null : selectedStarlink.spaceTrack.OBJECT_NAME}</b></div>
            <div className='selected-satellite-details'>Latitude: {selectedStarlink.latitude === undefined ? null : selectedStarlink.latitude.toFixed(3)}</div>
            <div className='selected-satellite-details'>Longitude: {selectedStarlink.longitude === undefined ? null : selectedStarlink.longitude.toFixed(3)}</div>
            <div className='selected-satellite-details'>Velocity (km/s): {selectedStarlink.velocity_kms === undefined ? null : selectedStarlink.velocity_kms.toFixed(2)}</div>
          </div>
        )}
    </>
  )
}

export default SelectedSatelliteInfo;


