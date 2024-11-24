import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import five from "../assets/five.png";

interface BoxProps {
  position: number[];
}

export default function Box(props: BoxProps) {
  const mesh = useRef<THREE.Mesh>(null);

  const [active, setActive] = useState(false);

  useFrame(() => {
    if (mesh && mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });

  const texture = useMemo(() => new THREE.TextureLoader().load(five), []);

  return (
    <mesh
      position={new THREE.Vector3(...props.position)}
      ref={mesh}
      scale={active ? [2, 2, 2] : [1.5, 1.5, 1.5]}
      onClick={() => setActive(!active)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial attach="material" transparent side={THREE.DoubleSide}>
        <primitive attach="map" object={texture} />
      </meshBasicMaterial>
    </mesh>
  );
}
