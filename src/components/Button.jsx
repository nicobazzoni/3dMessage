import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Button(props) {
  const meshRef = useRef();
  const fontRef = useRef();
  

  // Load font.json file and create custom font
  React.useEffect(() => {
    fetch("/path/to/font.json")
      .then((response) => response.json())
      .then((json) => {
        const font = new THREE.Font(json);
        fontRef.current = font;
      });
  }, []);

  const [isHovered, setIsHovered] = React.useState(false);

  const handlePointerOver = React.useCallback(() => {
    setIsHovered(true);
  }, []);

  const handlePointerOut = React.useCallback(() => {
    setIsHovered(false);
  }, []);

  useFrame(() => {
    if (isHovered) {
      meshRef.current.material.color.set(0xff0000);
    } else {
      meshRef.current.material.color.set(0x00ff00);
    }
  });

  return (
    <>
      {fontRef.current && (
        <mesh
          ref={meshRef}
          position={props.position}
          onClick={props.onClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <boxBufferGeometry args={[0.2, 0.2, 0.1]} />
          <meshStandardMaterial color={isHovered ? 0xff0000 : 0x00ff00} />
          <textGeometry
            args={[props.text, { font: fontRef.current, size: 0.6 }]}
            position={[0, 0, 0.05]}
          >
            <meshStandardMaterial color={"black"} />
          </textGeometry>
        </mesh>
      )}
    </>
  );
}

export default Button;