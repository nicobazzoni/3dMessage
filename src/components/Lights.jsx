import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const Lights = () => {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.opacity = 0.5 + 0.5 * Math.sin(clock.elapsedTime);
    }
  });

  return (
    <>
      <pointLight color="white" intensity={1} position={[0, 0, 0]} />
      <mesh ref={meshRef}>
        <planeBufferGeometry args={[100, 100]} />
        <meshBasicMaterial transparent />
      </mesh>
    </>
  );
};

export default Lights;
