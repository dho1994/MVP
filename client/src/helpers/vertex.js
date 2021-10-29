// Helper function for converting coordinates [longitude, latitude] into a THREE.Vector3 in (x, y, z) plane
// Points will be positioned according to a given radius from the center
const vertex = (point, radius) => {
  const lambda = point[0] * Math.PI / 180;
  const phi = point[1] * Math.PI / 180;
  const cosPhi = Math.cos(phi);

  const x = radius * cosPhi * Math.cos(lambda);
  const y = radius * cosPhi * Math.sin(lambda);
  const z = radius * Math.sin(phi);

  return [x, y, z];
}

export default vertex;