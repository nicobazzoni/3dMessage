import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ThreeText from './components/Three'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <>
    <header className="App-header">
      <img src={reactLogo} className="App-logo" alt="logo" />
<h1 className='text-mono text-justify p-2 font-bold'>TEXT 3D</h1>
      </header>
  <ThreeText />
    </>
  )
}

export default App
