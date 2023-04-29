import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Torus({ position, speed }) {
  const ref = useRef();

  useFrame(() => {
    // Move the particle towards the camera
    ref.current.position.add(speed);

    // If the particle is too close to the camera, reset its position
    if (ref.current.position.z > -10) {
      ref.current.position.set(
        position.x,
        position.y,
        position.z + 50 + Math.random() * 300
      );
    }
  });

  return (
    <points ref={ref}>
      <sphereBufferGeometry args={[0.3, 0.2, 0.1]} />
      <pointsMaterial color="pink" size={0.05} />
    </points>
  );
}

function TorusField() {
  const particles = [];

  for (let i = 0; i < 100; i++) {
    const position = new THREE.Vector3(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      -100 - Math.random() * 200
    );
    const speed = new THREE.Vector3(
      0,
      0,
      (Math.random() + 0.5) * 0.1 + 0.05
    );

    particles.push({ position, speed });
  }

  return (
    <>
      {particles.map((particle, index) => (
        <Torus key={index} position={particle.position} speed={particle.speed} />
      ))}
    </>
  );
}



export default TorusField;
