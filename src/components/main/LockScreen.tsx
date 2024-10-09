import { useEffect, useState, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { createXRStore, XR, XRLayer, XROrigin } from '@react-three/xr';
import { SRGBColorSpace, VideoTexture } from 'three';
import { forwardHtmlEvents } from '@pmndrs/pointer-events';
import { Text } from '@react-three/drei';

const store = createXRStore({
  foveation: 0,
});

function App() {
  const [webXRSupported, setWebXRSupported] = useState(true);

  useEffect(() => {
    // Check if WebXR is supported
    if (!navigator.xr) {
      setWebXRSupported(false);
    }
  }, []);


  // Memoized video element
  const video = useMemo(() => {
    const result = document.createElement('video');
    result.src = 'test.mp4';
    return result;
  }, []);

  const videoTexture = useMemo(() => {
    const texture = new VideoTexture(video);
    texture.colorSpace = SRGBColorSpace;
    return texture;
  }, [video]);




  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {!webXRSupported && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            backgroundColor: '#f8d7da',
            padding: '16px 32px',
            borderRadius: '8px',
            border: '1px solid #f5c6cb',
            color: '#721c24',
            fontSize: '18px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontWeight: 'bold',
          }}
        >
          WebXR is not supported in your browser.
        </div>
      )}

      <button
        onClick={() => store.enterAR()}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10, // Ensure the button is above the canvas
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent background
          padding: '10px 20px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          color: 'black',
          fontWeight: 'bold',
          fontSize: '16px',
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
          <Text scale={0.03} color="black" position={[-0.6, 0.28, -0.5]}>
            32x32 XRLayer with DPR=32
          </Text>
          <XROrigin position={[0, -1.5, 0]} />
          <XRLayer
            rotation-y={Math.PI / 16}
            dpr={32}
            pixelWidth={32}
            pixelHeight={32}
            position={[-0.6, 0, -0.5]}
            scale={0.5}
            shape="quad"
          >
            <mesh>
              <boxGeometry />
              <meshBasicMaterial color="red" toneMapped={false} />
            </mesh>
          </XRLayer>

          <Text scale={0.03} color="black" position={[0, 0.28, -0.5]}>
            With XRLayer
          </Text>
          <XRLayer
            position={[0, 0, -0.5]}
            onClick={() => video.play()}
            scale={0.5}
            shape="quad"
            src={video}
          />

          <Text scale={0.03} color="black" position={[0.6, 0.28, -0.5]}>
            Without XRLayer
          </Text>
          <mesh rotation-y={-Math.PI / 16} position={[0.6, 0, -0.5]} scale={0.5}>
            <planeGeometry />
            <meshBasicMaterial map={videoTexture} toneMapped={false} />
          </mesh>
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
