import { OrbitControls, PerspectiveCamera, View } from '@react-three/drei'
import React, { Suspense } from 'react'
import Lights from './Lights'
import IPhone from './IPhone'
import * as THREE from 'three'
import Loader from './Loader'

function ModelView({ index, groupRef, gsaptype, controlRef, setRotationState, item, size }) {
   
    return (
        <View index={index} id={gsaptype} className={`w-full h-full absolute ${index === 2 ? 'right-[-100%]' : ''}`}>

            {/* ambientLight */}
            <ambientLight intensity={0.4} />

            <PerspectiveCamera makeDefault position={[0, 0, 4]} />

            <Lights />

            <OrbitControls makeDefault ref={controlRef} rotateSpeed={0.4} enablePan={false} enableZoom={false} target={new THREE.Vector3(0, 0, 0)} onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}/>

            <group ref={groupRef} name={`${index === 1 ? 'small' : 'large'} `} position={[0, 0, 0]}>
                <Suspense fallback={<Loader/>}>
                    <IPhone scale={ index === 1 ? [15, 15, 15] : [17, 17, 17]} item={item} size={size}/>
                </Suspense>
            </group>
        </View>
    )
}

export default ModelView