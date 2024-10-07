/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import ThreeMeshUI from 'three-mesh-ui'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'


// import css from assets/css/style.css

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

ReactDOM.render(
  <Canvas camera={{ position: [0, 0, 1] }}>
    <color args={["#eee"]} attach="background" />
    <OrbitControls />
    <Panel />
  </Canvas>,
  document.getElementById('root')
)
