/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import ThreeMeshUI from 'three-mesh-ui'
import * as THREE from 'three'
import './assets/css/style.css'

extend(ThreeMeshUI)

function Title({ accentColor }: { accentColor: THREE.Color }) {
  return (
    <block
      args={[
        {
          width: 1,
          height: 0.25,
          backgroundOpacity: 0,
          justifyContent: 'center'
        }
      ]}>
      <text>{'Hello '}</text>
      <text color={accentColor.getStyle()}>world!</text>
    </block>
  )
}

function Panel() {
  const [accentColor] = useState(() => new THREE.Color('red'))
  useFrame(() => {
    ThreeMeshUI.update()
  })
  return (
    <block
      args={[
        {
          width: 1,
          height: 0.5,
          fontSize: 0.1,
          backgroundOpacity: 1,
        }
      ]}>
      <Title accentColor={accentColor} />
    </block>
  )
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      {/* Adding Environment texture as a background */}
      <Environment preset="sunset" background /> {/* Change 'sunset' to any available preset or custom HDRI */}

      <OrbitControls />
      <Panel />
    </Canvas>
  )
}
