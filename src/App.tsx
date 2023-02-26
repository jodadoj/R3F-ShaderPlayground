import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from 'three';

import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";

import "./App.css";


export function Example():JSX.Element {

    // This reference will give us direct access to the mesh
    const mesh = useRef<THREE.Mesh>(new THREE.Mesh());

    useFrame(({ clock }) => {
      const a = clock.getElapsedTime();
      // mesh.current.rotation.y = a;
    });

    return (
      <mesh
        ref={mesh}
        position={[0, 0, 0]}
        // rotation={[-Math.PI / 2, 0, 0]}
        scale={1.5}
      >
        <planeGeometry args={[1, 1, 32, 32]} />
        <shaderMaterial
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          // wireframe
        />
      </mesh>
    );
  };

export default function App(): JSX.Element {
  

  return (
    <div className="ctn-fullscreen">
      <Canvas camera={{ position: [0.0, 0.0, 1.0] }}>
        <Example />
        <axesHelper />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
