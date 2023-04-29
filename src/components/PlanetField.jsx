import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Planet({ position, radius }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    // Rotate the planet slowly over time
    ref.current.rotation.y = clock.elapsedTime * 0.03;

    // Move the planet towards the camera
    ref.current.position.z += 0.02;

    // If the planet is too close to the camera, reset its position
    if (ref.current.position.z > -100) {
      ref.current.position.set(
        position.x,
        position.y,
        position.z - 500 - Math.random() * 1000
      );
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereBufferGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

function PlanetField() {
  const planets = [
    { position: new THREE.Vector3(-50, 20, -1000), radius: 40 },
    { position: new THREE.Vector3(80, -40, -1500), radius: 30 },
    { position: new THREE.Vector3(0, 0, -2000), radius: 50 },
    { position: new THREE.Vector3(-120, 50, -2500), radius: 35 },
    { position: new THREE.Vector3(150, -60, -3000), radius: 45 },
  ];

  return (
    <>
      {planets.map((planet, index) => (
        <Planet key={index} position={planet.position} radius={planet.radius} />
      ))}
    </>
  );
}

export default PlanetField;
