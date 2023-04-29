import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, MeshBasicMaterial, PlaneBufferGeometry } from 'three';

const Panel = () => {
  const ref = useRef();
  
  useFrame(() => {
    // Rotate the panel on every frame
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh position={[0, 0, -10]} ref={ref}>
      <planeBufferGeometry args={[5, 5]} />
      <meshBasicMaterial color={'red'} />
      <meshBasicMaterial color={'blue'} wireframe={true} />
    </mesh>
  );
};

const ButtonPanel = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Panel />
      <Box />
    </Canvas>
  );
};

export default ButtonPanel;
