import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Cloud, OrbitControls, Plane, Sky, Sparkles, Stars, Text, Text3D, Sphere } from '@react-three/drei';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { SphereGeometry } from 'three';
import { signIn } from '../firebase'

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

const Three = () => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const sphereRef = useRef(); // Create a ref for the sphere

  const animateSphere = (time) => {
    // Animation logic for moving the sphere
    if (sphereRef.current) {
      const x = Math.cos(time) * 5;
      const y = Math.sin(time) * 10;
      sphereRef.current.position.set(x, y, 0);
    }
  };

  useEffect(() => {
    let frameId;
    const animate = (time) => {
      animateSphere(time);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
//fectch messages from firebase as they are added 
    const fetchMessages = async () => {
      const querySnapshot = await getDocs(collection(firebaseDb, 'messages'));
      const messages = querySnapshot.docs.map((doc) => doc.data());
      setMessages(messages);
    }
    fetchMessages();

  }, []);

//show new messages as they are added
 



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !message) {
      return;
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username: </label>
        <input  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" id="username"  value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label htmlFor="message">Message: </label>
        <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <br />
        <button className=' absolute right-52 top-50 bg-stone-100 text-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' type="submit">Submit</button>
      </form>
      <Canvas  style={{ height: '100vh', width: '100vw' }} background='blue'>
      {/* <Plane args={[10, 10]}  rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <meshStandardMaterial color={'#000000'} />
      </Plane> */}
        <OrbitControls />
        <Stars  radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Sparkles  position={[0, 0, 0]} />
        <ambientLight />
        {/* <Cloud position={[Math.random() * 10, 5,  Math.random() * 10, Math.random() * 10]} /> */}
        <Sphere ref={sphereRef} args={[1, 32, 32]} color="red">
          <meshStandardMaterial />
        </Sphere>
        
       
        <pointLight position={[10, 10, 10]} color='red' />
          
        {messages.map((message, index) => (
          <Text  key={index}
         //position each new message so that there is a gap between them  you can read them going through z index 
         position={[0, 0.5 + index * 0.5, index * 1.0, index * 2.0]}
          color="black"
          outlineColor="white" // set the outline color
          outlineWidth={0.1} // set the outline width
          fontSize={0.2}
          //make the text face the camera
       
          anchorX="center" // set the anchor point on x axis
          anchorY="middle"
          font="/Orbitron_Bold.json"
          
          lineHeight={1}
          textAlign="center" // set the text alignment
           // set the depth offset (should be a small value)
          
        // set the font size
         // set the anchor point on y axis
          letterSpacing={0.5} // set the letter spacing
          material={null} // set the material
        >
           {message.message} -  {message.username} 
          </Text>
        ))}
      </Canvas>
    </div>
  );
};

export default Three;
