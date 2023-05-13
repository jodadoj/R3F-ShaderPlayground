import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";

import "./App.css";

export function Example(): JSX.Element {
  // This reference will give us direct access to the mesh
  const mesh = useRef<THREE.Mesh>(new THREE.Mesh());
  const hover = useRef(false);

  const uniforms = useMemo(
    () => ({
      u_intensity: {
        value: 0.3,
      },
      u_time: {
        value: 0.0,
      },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();

    mesh.current.material.uniforms.u_intensity.value = THREE.MathUtils.lerp(
      mesh.current.material.uniforms.u_intensity.value,
      hover.current ? 0.85 : 0.15,
      0.02
    );
  });

  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      scale={1.5}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
    >
      <icosahedronGeometry args={[2, 20]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
}

export default function App(): JSX.Element {
  return (
    <div className="ctn-fullscreen">
      <Canvas camera={{ position: [0.0, 0.0, 8.0], rotateX: -Math.PI / 4 }}>
        <Example />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
