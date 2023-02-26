import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';


export default function App():JSX.Element {

  const Cube = () => {
    const mesh = useRef();
  
    return (
      <mesh ref={mesh}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={0xffffff} />
      </mesh>
    );
  };
  
  return (
    <Canvas>
      <Cube />
    </Canvas>
  );
};