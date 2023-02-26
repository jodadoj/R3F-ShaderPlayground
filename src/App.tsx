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

    const uniforms = useMemo(
      () => ({
        u_time: {
          value: 0.0,
        },
      }), []
    );
  
    useFrame((state) => {
      const { clock } = state;
      mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
    });
  
    return (
      <mesh ref={mesh} position={[0, 0, 0]}  rotation={[-Math.PI / 2, 0, 0]} scale={1.5}>
        <boxGeometry args={[7, 1, 0, 64, 64]} />
        <shaderMaterial
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
          // wireframe
        />
      </mesh>
    );
  };

export default function App(): JSX.Element {
  

  return (
    <div className="ctn-fullscreen">
      <Canvas camera={{ position: [0.0, 0.0, 3.0], rotateX:-Math.PI/4 }}>
        <Example />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
