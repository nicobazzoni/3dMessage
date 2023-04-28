import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Cloud, OrbitControls, Plane, Sky, Sparkles, Stars, Text, Text3D, Sphere, Billboard, ScreenSpace, Trail, CameraControls, PerspectiveCamera, FlyControls,  } from '@react-three/drei';


import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

import Button from './Button';
import TrailBlaze from './Trail';
import * as THREE from 'three';


import ModifiedFlyControls from './ModifiedFlyControls';




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBj569fcombAmC3dDyzXdOm-hMxPpkhrz4",
  authDomain: "text-r3f.firebaseapp.com",
  projectId: "text-r3f",
  storageBucket: "text-r3f.appspot.com",
  messagingSenderId: "1070529275605",
  appId: "1:1070529275605:web:a74a89a082a2298cbb245c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseDb = getFirestore(firebaseApp);


const Three = ({ }) => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const sphereRef = useRef(); // Create a ref for the sphere
  const spacing = 1; // spacing between messages along the z-axis
  const staggerAmount = 1; // additional offset to stagger messages along the z-axis
  const [shouldAnimate, setShouldAnimate] = useState(true);



  // Update camera position on each frame
  //on scroll move camerea through z index
  
  const [isAnimating, setIsAnimating] = useState(true);
  const animateSphere = (time) => {
    // Animation logic for moving the sphere
    if (sphereRef.current) {
      const x = Math.cos(time) * 5;
      const y = Math.sin(time) * 10;
      sphereRef.current.position.set(x, y, 0);
    }
  };
  
  



  
 

  const setZPositions = (messages, spacing, staggerAmount) => {
    const zPositions = [];
    let z = 0;
    for (let i = 0; i < messages.length; i++) {
      // Add an additional offset based on the index of the message
      z -= spacing + (i * staggerAmount);
      zPositions.push(z);
    }
    return zPositions;
  };
  const zPositions = setZPositions(messages, spacing, staggerAmount);

 

 


  useEffect(() => {
    let frameId;
    const animate = (time) => {
      if (isAnimating) { // Add condition to check isAnimating state
        animateSphere(time);
      }
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isAnimating]); 

  useEffect(() => {
    // Fetch messages from Firebase as they are added
    const fetchMessages = async () => {
      const querySnapshot = await getDocs(collection(firebaseDb, 'messages'));
      const messages = querySnapshot.docs.map((doc) => doc.data());
      setMessages(messages);
      // Set z positions of messages
      const zPositions = setZPositions(messages, spacing, staggerAmount);
      setZPositions(zPositions);
    }
    fetchMessages();
  }, []);

//show new messages as they are added
 
  onkeydown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }

  }

 
   
  const animate = (time) => {
    if (isAnimating) {
      animateSphere(time);
    }
    frameId = requestAnimationFrame(animate);
  };
    
   const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !message) {
      return 
    }

    try {
      await addDoc(collection(firebaseDb, 'messages'), { username, message });
    } catch (error) {
      console.error('Error adding message to Firebase:', error);
    }

    setUsername('');
    setMessage('');
    //refresh messages
    const querySnapshot = await getDocs(collection(firebaseDb, 'messages'));
    const messages = querySnapshot.docs.map((doc) => doc.data());
    setMessages(messages);
};

const cloudCount = 30; // Number of clouds to create
const cloudSpacing = 50; // Spacing between clouds along the z-axis

const Clouds = () => {
  return (
    <>
      {Array.from({ length: cloudCount }).map((_, index) => (
        <Cloud
          key={index}
          color='black'
          position={new THREE.Vector3(0, 0, -index * cloudSpacing)} // Set z-position based on index
          /* other props */
        />
      ))}
    </>
  );
};





const [modalOpen, setModalOpen] = useState(false);
 

const handleButtonClick = () => {
  setModalOpen(!modalOpen);
};

const handleModalClose = () => {
  setModalOpen(false);
};



//create reset button
const ResetButton = () => {
  const { camera } = useThree();
  return (
    <Button
      onClick={() => {
        camera.position.set(0, 0, 0);
        camera.lookAt(0, 0, -1);
      }}
      position={[0, 0, -2]}
    />
  );
};
  


return (
    <div className='border-none'>
      <button onClick={handleButtonClick} className="bg-stone-100 h-10 right-28  rounded-lg p-2 mb-3 mt-4">
          {modalOpen ? 'Close Modal' : 'Create Message'}
        </button>
        <div>
        {modalOpen && (
        <div className="modal-overlay " onClick={handleButtonClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      
     <form onSubmit={handleSubmit}  className="mb-4 flex justify-center  ">
      
  <div className="bg-stone-200rounded-lg shadow-lg p-4 max-w-sm">
    <label className="block mt-2 mb-2 p-2 text-sm font-medium text-gray-900 items-center justify-center">
      Username:
    </label>
    <input
      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900 text-sm mb-4"
      type="text"
      id="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    <label htmlFor="message" className="block text-sm font-medium text-gray-900">
      Message:
    </label>
    <input
      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900 text-sm mb-4"
      type="text"
      id="message"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={onkeydown}
    />
    <button
      className="w-full bg-stone-100 text-black hover:bg-teal-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2"
      type="submit"
    >
      Submit
    </button>
  </div>
</form>
</div>

</div>
        
      )}

     

      </div>

     
      
      <Canvas  style={{ height: '100vh', width: '100vw' }} background='blue'>
      
      <Stars color={['#ff0000', '#00ff00', '#0000ff']} radius={100} depth={50} count={5000} factor={8} saturation={0} fade speed={1} />
       <Sparkles radius={10000} depth={10000} count={5000} factor={50} saturation={0} fade speed={1} />
     
        <Cloud color='black' position={new THREE.Vector3(0, 0, -100)}  />
       
        <Trail >
        <Sphere ref={sphereRef} args={[1, 32, 32]} color="red">
        <meshStandardMaterial />
        </Sphere> 
        <spotLight position={[0, 0, 0]} angle={0.3} penumbra={1} intensity={2} color="white" />
        </Trail>
        <Clouds />
        <TrailBlaze  />
      
        <FlyControls movementSpeed={10} rollSpeed={0.5} dragToLook={true} />
       
        <ModifiedFlyControls movementSpeed={5} rollSpeed={0.5} dragToLook={true} />
      
        <pointLight position={[10, 10, 10]} color='red' />

        
       
    
          
        {messages.map((message, index) => (
         
        
           
           <>
           <mesh >

           <Text key={index} 

            position={[0, 0, zPositions[index]]}
            
            outlineColor='white' // default is 'black'

            outlineWidth={0.1} // set the outline width
            fontSize={0.2}
            color='black'
           
            anchorX="center" 
            anchorY="middle"
            font="/Orbitron_Bold.json"


            lineHeight={1}
            textAlign="center" 
            letterSpacing={0.5} 
            material={null} 
          >
            {message.message}  
          
          </Text>  
          <Text key={index} 

            position={[0, -0.5, zPositions[index]]}
            
            outlineColor='white' // default is 'black'

            outlineWidth={0.1} // set the outline width
            fontSize={0.1}
            color='black'
           
            anchorX="center" 
            anchorY="middle"
            font="/Orbitron_Bold.json"


            lineHeight={1}
            textAlign="center" 
            letterSpacing={0.5} 
            material={null} 
          >
               {message.username}
          
          </Text> 
          
          </mesh>
          
           </>  
        ))}


      </Canvas>
     
    </div>
  );
};

export default Three;




