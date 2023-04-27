import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Trail = ({ color, ...props }) => {
  const meshRef = useRef();

  const vertices = new Float32Array(2 * 3);
  const colors = new Float32Array(2 * 3);

  const colorObj = new THREE.Color(color);

  vertices[0] = 0;
  vertices[1] = 0;
  vertices[2] = props.z;

  colorObj.toArray(colors, 0);

  vertices[3] = 0;
  vertices[4] = 0;
  vertices[5] = props.z - props.length;

  colorObj.toArray(colors, 3);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const materialRef = useRef();

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = performance.now() / 1000;
    }
  });

  return (
    <line ref={meshRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          time: { value: 0 },
          color: { value: colorObj },
        }}
        vertexShader={`
          uniform float time;

          void main() {
            vec4 modelPosition = modelMatrix * vec4(position, 10.0);
            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;

            gl_Position = projectedPosition;

            float z = modelPosition.z;
            float sinTime = sin(time * 0.5);

            gl_Position.x += sinTime * z * 0.005;
          }
        `}
        fragmentShader={`
          uniform vec3 color;

          void main() {
            gl_FragColor = vec4(color, 1.0);
          }
        `}
        vertexColors
        linewidth={3}
        transparent
      />
    </line>
  );
};

const TrailBlaze = () => {
  const trailCount = 400;
  const trailSpacing = 1000;
  const trailLength = 2000;

  return (
    <>
      {Array.from({ length: trailCount }).map((_, index) => (
        <Trail
        key={index}
        color="pink"
        z={index * -trailSpacing} // Set the z value based on the index
        length={trailLength}
        count={trailCount}
        spacing={trailSpacing}
          
        />
      ))}
    </>
  );
};

export default TrailBlaze;