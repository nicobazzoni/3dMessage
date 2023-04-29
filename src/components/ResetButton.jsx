import React, { useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';

function ResetButton(props) {
  const { onClick } = props;
  const meshRef = useRef();
  const { camera } = useThree();

  const handleClick = () => {
    camera.position.set(0, 0, 0);
    onClick();
  };

  return (
    <mesh
      ref={meshRef}
      onClick={handleClick}
      position={[-window.innerWidth / 2 + 20, window.innerHeight / 2 - 20, -100]}
    >
      <Text color="#f05858" fontSize={16} maxWidth={100} outlineOffsetY={-5} outlineWidth={1} position={[0, 0, 0]}>
        RESET
      </Text>
    </mesh>
  );
}

export default ResetButton;
