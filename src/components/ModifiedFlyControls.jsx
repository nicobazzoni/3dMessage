

import { useRef } from "react";


import { FlyControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useCallback } from "react";

const ModifiedFlyControls = (props) => {
  const [speed, setSpeed] = useState(1);

  const handleKeyDown = useCallback(() => {
    setSpeed(speed + 0.1);
  }, [speed]);

  const handleKeyUp = useCallback(() => {
    setSpeed(speed - 0.1);
  }, [speed]);

  const flyControlsRef = useRef(null);

  useEffect(() => {
    if (flyControlsRef.current) {
      flyControlsRef.current.autoForward = true;
    }
  }, []);

  

  return (
    <>
      <mesh
        onClick={handleKeyDown}
        className="bg-stone-100 h-10 right-28  rounded-lg p-2 mb-3 mt-4"
      >
        Speed Up
      </mesh>
      <mesh
        onClick={handleKeyUp}
        className="bg-stone-100 h-10 right-28  rounded-lg p-2 mb-3 mt-4"
      >
        Speed Down
      </mesh>
      <FlyControls
        ref={flyControlsRef}
        movementSpeed={speed}
        
        keyboardControls={true}
        position={[0, 0, 0]}
       
       
        //makeDefault camera position


        {...props}
      />
    </>
  );
};

export default ModifiedFlyControls;

