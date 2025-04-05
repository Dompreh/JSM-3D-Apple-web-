import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

function Apple(props) {
  const { nodes, materials } = useGLTF('/models/apple_logo.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.svgMesh1_aiStandardSurface1_0.geometry}
        material={materials.aiStandardSurface1}
        scale={0.01}
      />
    </group>
  )
}

export default Apple

useGLTF.preload('/models/apple_logo.glb')

