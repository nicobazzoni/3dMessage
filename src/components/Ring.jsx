import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function TorusRing({ position, speed, size }) {
  const ref = useRef();

  useFrame(() => {
    // Move the torus ring towards the camera
    ref.current.position.add(speed);

    // If the torus ring is too close to the camera, reset its position
    if (ref.current.position.z > -100) {
      ref.current.position.set(
        position.x,
        position.y,
        position.z - 1000 - Math.random() * 1000
      );
    }
  });

  return (
    <mesh ref={ref}>
      <torusBufferGeometry args={[size, 0.9, 40, 9]} />
        <meshBasicMaterial color="white" />

     
    </mesh>
  );
}

function TorusRingField() {
  const rings = [];

  for (let i = 0; i < 10; i++) {
    const position = new THREE.Vector3(
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100,
      -1000 - Math.random() * 1000
    );
    const speed = new THREE.Vector3(
      0,
      0,
      (Math.random() + 0.5) * 1 + 0.1
    );
    const size = (Math.random() + 2) * 200;

    rings.push({ position, speed, size });
  }

  return (
    <>
      {rings.map((ring, index) => (
        <TorusRing key={index} position={ring.position} speed={ring.speed} size={ring.size} />
      ))}
    </>
  );
}

export default TorusRingField;
