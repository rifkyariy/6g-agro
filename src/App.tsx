import { Canvas } from "@react-three/fiber";
import { Fullscreen } from "@react-three/uikit";
import { Defaults } from "@react-three/uikit-apfel";
import { Container, Text } from '@react-three/uikit'
import { Card } from "@react-three/uikit-apfel"
import { Button } from "@react-three/uikit-apfel"
import { BoxSelect } from '@react-three/uikit-lucide'

function ButtonsOnCard() {
  return (
    <Container flexDirection="column" md={{ flexDirection: 'row' }} alignItems="center" gap={32}>
      <Card borderRadius={32} padding={16}>
        <Container flexDirection="column" justifyContent="space-between" alignItems="center" gapRow={16}>
          <Button variant="icon" size="xs">
            <BoxSelect />
          </Button>
          <Button variant="rect" size="sm" platter>
            <Text>Test</Text>
          </Button>
          <Button variant="rect" size="xl" disabled>
            <Text>Go</Text>
          </Button>
        </Container>
      </Card>
    </Container>
  )
}

export default function App() {
  return (
    <Canvas style={{ position: "absolute", inset: "0", touchAction: "none" }} gl={{ localClippingEnabled: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1} position={[-5, 5, 10]} />
      <Defaults>
        <Fullscreen
          overflow="scroll"
          scrollbarColor="black"
          backgroundColor="white"
          dark={{ backgroundColor: "black" }}
          flexDirection="column"
          gap={32}
          paddingX={32}
          alignItems="center"
          padding={32}
        >
          <ButtonsOnCard />
        </Fullscreen>
      </Defaults>
    </Canvas>
  )
}