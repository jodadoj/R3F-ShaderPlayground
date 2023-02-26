import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';

const Cube = () => {
  const mesh = useRef();

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={0xffffff} />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas>
      <Cube />
    </Canvas>
  );
};