import { OrbitControls, PerspectiveCamera, Center, Lightformer } from '@react-three/drei'
import React, { useRef } from 'react'
import Apple from './Apple'
import * as THREE from 'three'

function Loader() {
    const cameraRef = useRef()
    return (
        <>
            <ambientLight intensity={1.4} />
            <pointLight position={[5, 5, 5]} intensity={2.4} color="orange" />
            <spotLight
                position={[0, -25, 10]}
                angle={0.15}
                penumbra={1}
                decay={0}
                intensity={Math.PI * 0.2}
                color={"#f8f9fa"}
            />

            <PerspectiveCamera position={[0, 0, 5]} />
            <OrbitControls ref={cameraRef} autoRotate={true} rotateSpeed={4} enablePan={false} enableZoom={false} target={new THREE.Vector3(0, 0, 0)} />
            <Center>

                <Apple scale={[10.4, 10.4, 10.4]} />
            </Center>
        </>
    )
}

export default Loader