import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";

import "./App.css";

export function Example(): JSX.Element {
  // This reference will give us direct access to the mesh
  const mesh = useRef<THREE.Mesh>(new THREE.Mesh());
  const mousePosition = useRef({ x: 0, y: 0 });

  const updateMousePosition = useCallback((e) => {
    mousePosition.current = { x: e.pageX, y: e.pageY };
  }, []);

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_bg: {
        value: new THREE.Color("#A1A3F7"),
      },
      u_colorA: { value: new THREE.Color("#9FBAF9") },
      u_colorB: { value: new THREE.Color("#FEB3D9") },
    }),
    []
  );

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition, false);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition, false);
    };
  }, [updateMousePosition]);

  useFrame((state) => {
    const { clock } = state;

    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
    mesh.current.material.uniforms.u_mouse.value = new THREE.Vector2(
      mousePosition.current.x,
      mousePosition.current.y
    );
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={1.5}>
      <planeGeometry args={[1, 1, 32, 32]} />
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
      <Canvas camera={{ position: [0.0, 0.0, 2.0], rotateX: -Math.PI / 4 }}>
        <Example />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
