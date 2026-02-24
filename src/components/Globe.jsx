import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

function Earth() {
  return (
    <Sphere args={[2, 64, 64]}>
      <meshStandardMaterial color="#1e90ff" wireframe={false} />
    </Sphere>
  );
}

export default function Globe() {
  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <Earth />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
}
