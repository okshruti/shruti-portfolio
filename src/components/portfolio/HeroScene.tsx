import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

const MAROON = "#581C2D";
const BURGUNDY = "#722F43";
const BEIGE = "#E9DDCC";

function Sculpture({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 0.05);
    if (!reduced) g.rotation.y += dt * 0.15;
    const tx = state.pointer.y * 0.25;
    const ty = state.pointer.x * 0.35;
    g.rotation.x += (tx - g.rotation.x) * (1 - Math.exp(-3 * dt));
    g.position.x += (ty * 0.4 - g.position.x) * (1 - Math.exp(-2.5 * dt));
    const scroll = Math.min(window.scrollY / window.innerHeight, 1);
    g.rotation.z += (scroll * 0.6 - g.rotation.z) * (1 - Math.exp(-4 * dt));
  });
  return (
    <group ref={group} scale={0.72}>
      <Float speed={reduced ? 0 : 1.2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh castShadow>
          <torusKnotGeometry args={[1, 0.32, mobile ? 128 : 220, mobile ? 20 : 32, 2, 3]} />
          <meshPhysicalMaterial color={MAROON} metalness={0.85} roughness={0.22} clearcoat={1} clearcoatRoughness={0.1} envMapIntensity={1.3} />
        </mesh>
      </Float>
      <Float speed={reduced ? 0 : 1.6} floatIntensity={1}>
        <mesh position={[1.7, 1.1, -0.4]}>
          <icosahedronGeometry args={[0.55, 0]} />
          {mobile
            ? <meshPhysicalMaterial color={BEIGE} roughness={0.1} transmission={0.6} thickness={0.5} />
            : <MeshTransmissionMaterial thickness={0.6} roughness={0.05} chromaticAberration={0.03} color={BEIGE} samples={4} resolution={256} />}
        </mesh>
      </Float>
      <Float speed={reduced ? 0 : 1.4} floatIntensity={0.8}>
        <mesh position={[-1.8, -1, 0.3]}>
          <sphereGeometry args={[0.38, 48, 48]} />
          <meshPhysicalMaterial color={BEIGE} metalness={1} roughness={0.18} />
        </mesh>
      </Float>
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.3, 0.012, 16, 160]} />
        <meshStandardMaterial color={BURGUNDY} metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 3;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      arr[i * 3 + 2] = r * Math.cos(p);
    }
    return arr;
  }, [count]);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y -= Math.min(d, 0.05) * 0.03;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color={BURGUNDY} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function HeroScene({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  return (
    <Canvas
      dpr={[1, mobile ? 1.25 : 1.75]}
      performance={{ min: 0.5 }}
      camera={{ position: [0, 0, 9], fov: 40 }}
      gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.domElement.parentElement?.parentElement?.setAttribute("data-scene-ready", "true")}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 5]} intensity={1.6} color="#fff4ea" />
      <pointLight position={[-4, -2, 3]} intensity={18} color={BURGUNDY} />
      <Environment resolution={128}>
        <Lightformer intensity={2.5} position={[0, 5, 0]} scale={[10, 10, 1]} color="#fff6ee" />
        <Lightformer intensity={1.2} color={BEIGE} position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
        <Lightformer intensity={0.8} color="#ffffff" position={[0, 0, 6]} scale={[4, 4, 1]} />
        <Lightformer intensity={1} color="#c7889a" position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={[20, 2, 1]} />
      </Environment>
      <Sculpture reduced={reduced} mobile={mobile} />
      <Particles count={mobile ? 250 : 600} />
    </Canvas>
  );
}
