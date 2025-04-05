import { useRef } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Highlights from './components/Highlights'
import Model from './components/Model'
import Features from './components/Features'
import Chip from './components/Chip'
import Footer from './components/Footer'

// import {Canvas, useFrame} from "@react-three/fiber"
// import {Box, OrbitControls} from "@react-three/drei"


// function RotatingCube(){
//   const meshRef = useRef()
  

//   useFrame(() =>{
//     meshRef.current.rotation.x += 0.05;
//     meshRef.current.rotation.y += 0.01;
//   })

//   return(
//     <Box scale={3.5} ref={meshRef}>
//       <meshStandardMaterial color="hotpink" attach="material" />
//     </Box>
//   )
// }

function App() {

  return (
    <main className='bg-black'>
      <Navbar/>
      <Hero/>
      <Highlights/>
      <Model/>
      <Features/>
      <Chip/>
      <Footer/>
    </main>
    // <Canvas>
    //   <ambientLight/>
    //   <pointLight position={[10, 10, 10]}/>
    //   <RotatingCube/>
    //   <OrbitControls  ref={cameraRef}/>
    //   <mesh scale={2.8}>
    //     <ambientLight/>
    //     <pointLight position={[10,10,0]}/>
    //     <boxGeometry />
    //     <meshStandardMaterial color="gold" attach="material"/>
    //   </mesh>
  
    // </Canvas>
  )
}

export default App;
