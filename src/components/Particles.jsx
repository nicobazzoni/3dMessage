import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particle({ position, speed }) {
  const ref = useRef();

  useFrame(() => {
    // Move the particle towards the camera
    ref.current.position.add(speed);

    // If the particle is too close to the camera, reset its position
    if (ref.current.position.z > -10) {
      ref.current.position.set(
        position.x,
        position.y,
        position.z + 50 + Math.random() * 100
      );
    }
  });

  return (
    <points ref={ref}>
      <sphereBufferGeometry args={[0.03, 2, 1]} />
      <pointsMaterial color="white" />
    </points>
  );
}

function ParticleField() {
  const particles = [];

  for (let i = 0; i < 100; i++) {
    const position = new THREE.Vector3(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      -100 - Math.random() * 500
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
        <Particle key={index} position={particle.position} speed={particle.speed} />
      ))}
    </>
  );
}



export default ParticleField;
