import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import ThreeText from './components/Three';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
 

  const handleButtonClick = () => {
    setModalOpen(!modalOpen);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };


  

 

  return (
    <>
      <header className="App-header ">
        <img src={reactLogo} className="App-logo" alt="logo" />
        <h1 className="text-mono text-justify p-2 font-bold">TEXT 3D</h1>
        <button onClick={handleButtonClick} className="bg-stone-100 h-10 right-28  rounded-lg p-2 mb-3 mt-4">
          {modalOpen ? 'Close Modal' : 'Open controls Modal'}
        </button>
      </header>
      {modalOpen && (
        <div className="modal-overlay " onClick={handleButtonClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-900 text-sm font-medium">
                <span className="font-bold">WASD</span> move,
                <span className="font-bold"> R|F</span> up | down,
                <span className="font-bold"> Q|E</span> roll,
                <span className="font-bold"> up|down</span> pitch,
                <span className="font-bold"> left|right</span> yaw
              </p>
            </div>
          </div>
        </div>
      )}
      <div id="info" className="mb-4 flex justify-center items-center border-transparent focus:border-transparent focus:ring-0">
        <ThreeText />
      </div>
    </>
  );
}

export default App;
