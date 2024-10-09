import { Canvas, useThree } from '@react-three/fiber';
import { createXRStore, XR, XRLayer } from '@react-three/xr';
import { Text } from '@react-three/drei';
import { useEffect } from 'react';
import { forwardHtmlEvents } from '@pmndrs/pointer-events';

const store = createXRStore({
  foveation: 0,
});

function App() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center' }}>
      <button
        onClick={() => store.enterAR()}
        style={{
          position: 'absolute',
          top: '20px',
          zIndex: 10, // Ensure the button is above the canvas
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent background
          padding: '10px 20px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          color: 'black',
        }}
      >
        Enter AR
      </button>

      <Canvas
        events={() => ({ enabled: false, priority: 0 })}
        style={{ width: '100vw', height: '100vh', position: 'relative', background: 'lightgray' }}
        camera={{ position: [0, 0, 0] }}
      >
        <SwitchToXRPointerEvents />
        <XR store={store}>
          <Text scale={0.03} color="black" position={[0, 0.28, -0.5]}>
            Agro 6G
          </Text>
          <XRLayer
            position={[0, 0, -0.5]}
            scale={0.5}
            shape="quad"
          >
            <mesh>
              <boxGeometry />
              <meshBasicMaterial color="red" />
            </mesh>
          </XRLayer>
        </XR>
      </Canvas>
    </div>
  );
}

function SwitchToXRPointerEvents() {
  const { gl, camera, scene } = useThree();
  useEffect(() => forwardHtmlEvents(gl.domElement, camera, scene), [gl, camera, scene]);
  return null;
}

export default App;
