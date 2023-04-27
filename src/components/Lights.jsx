import * as THREE from 'three';
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Lights = ({ radius, depth, count, factor, saturation, fadeSpeed }) => {
  const sparkleRef = useRef();

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const color = new THREE.Color();

  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * radius;
    const y = (Math.random() - 0.5) * radius;
    const z = (Math.random() - 0.5) * depth;

    positions[i * 3 + 0] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    color.setHSL(i / count, saturation, 0.5);

    colors[i * 3 + 0] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  const sparkleMaterial = new THREE.PointsMaterial({
    size: 0.5,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true,
    opacity: 1,
    vertexColors: true,
  });

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const sparkleOpacity = Math.sin(time * fadeSpeed) * 0.5 + 0.5;
    sparkleMaterial.opacity = sparkleOpacity;
  });

  return (
    <points ref={sparkleRef} position={[0, 0, 0]}>
      <bufferGeometry attach='geometry'>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'color']}
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial attach='material' args={[sparkleMaterial]} />
    </points>
  );
};

export default Lights;
