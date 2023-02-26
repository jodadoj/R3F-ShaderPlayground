import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, Vector3 } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";

import "./App.css";

interface IFlagProps{
  rotate: number
  wireframeOn: boolean
  setPosition: Vector3
}

export function Flag(props: IFlagProps): JSX.Element {
  const rotate: number = props.rotate;
  const wireframeOn = props.wireframeOn;
  const setPosition = props.setPosition;
  // This reference will give us direct access to the mesh
  const mesh = useRef<THREE.Mesh>(new THREE.Mesh());

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    mesh.current.rotation.x = a / 2;
    // mesh.current.rotation.y = a;
    mesh.current.rotation.z = a;
  });

  return (
    <mesh
      ref={mesh}
      position={setPosition}
      // rotation={[-Math.PI / 2, 0, 0]}
      rotation={[rotate / 2, 0, 0]}
      scale={1.5}
    >
      <planeGeometry args={[10, 10, 32, 32]} />
      {wireframeOn ? 
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        wireframe
      /> : <shaderMaterial
      fragmentShader={fragmentShader}
      vertexShader={vertexShader}
    />}
    </mesh>
  );
}

export default function App(): JSX.Element {
  return (
    <div className="ctn-fullscreen">
      <div className="ctn-headings">
        <h1>Header</h1>
        <h2>Subheading</h2>
      </div>
      <Canvas camera={{ position: [1.0, 0.0, 1.0] }}>
        <Flag setPosition={[0, 3, 0]} wireframeOn={false} rotate={0} />
        <Flag setPosition={[0, 0, 0]} wireframeOn={true} rotate={-Math.PI} />
        <Flag setPosition={[0, 0, 0]} wireframeOn={true} rotate={Math.PI / 2} />
        <Flag setPosition={[0, 0, 0]} wireframeOn={true} rotate={0} />
        {/* <axesHelper /> */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}
