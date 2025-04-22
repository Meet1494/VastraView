"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { gsap } from "gsap"
import type * as THREE from "three"

// This component would use actual 3D models in a real implementation
// For this demo, we'll create more detailed procedural models
function MaleModel({ isSelected }: { isSelected: boolean }) {
  const group = useRef<THREE.Group>(null)

  useEffect(() => {
    if (group.current) {
      gsap.to(group.current.rotation, {
        y: isSelected ? Math.PI * 2 : 0,
        duration: 1.5,
        ease: "power2.out",
      })

      gsap.to(group.current.position, {
        y: isSelected ? 0.2 : 0,
        duration: 0.5,
        ease: "back.out",
      })
    }
  }, [isSelected])

  // Subtle animation
  useFrame((state) => {
    if (group.current && !isSelected) {
      group.current.rotation.y += 0.005
    }
  })

  return (
    <group ref={group}>
      {/* Base */}
      <mesh position={[0, -1.8, 0]} receiveShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.1, 32]} />
        <meshStandardMaterial color={isSelected ? "#22d3ee" : "#1e293b"} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Feet */}
      <mesh position={[-0.2, -1.6, 0]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.4]} />
        <meshStandardMaterial color="#334155" metalness={0.2} roughness={0.8} />
      </mesh>
      <mesh position={[0.2, -1.6, 0]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.4]} />
        <meshStandardMaterial color="#334155" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.2, -1, 0]} castShadow>
        <boxGeometry args={[0.25, 1, 0.25]} />
        <meshStandardMaterial color="#475569" metalness={0.1} roughness={0.8} />
      </mesh>
      <mesh position={[0.2, -1, 0]} castShadow>
        <boxGeometry args={[0.25, 1, 0.25]} />
        <meshStandardMaterial color="#475569" metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.7, 1, 0.4]} />
        <meshStandardMaterial color="#64748b" metalness={0.2} roughness={0.7} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.45, 0, 0]} castShadow>
        <capsuleGeometry args={[0.12, 0.8, 4, 8]} />
        <meshStandardMaterial color="#64748b" metalness={0.2} roughness={0.7} />
      </mesh>
      <mesh position={[0.45, 0, 0]} castShadow>
        <capsuleGeometry args={[0.12, 0.8, 4, 8]} />
        <meshStandardMaterial color="#64748b" metalness={0.2} roughness={0.7} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.1} roughness={0.9} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.1} roughness={0.9} />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <sphereGeometry args={[0.25, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#1e293b" metalness={0.1} roughness={1} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.1, 0.95, 0.25]} castShadow>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.1, 0.95, 0.25]} castShadow>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Pupils */}
      <mesh position={[-0.1, 0.95, 0.28]} castShadow>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.1, 0.95, 0.28]} castShadow>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Mouth */}
      <mesh position={[0, 0.82, 0.25]} castShadow rotation={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.02, 0.01]} />
        <meshStandardMaterial color="#475569" />
      </mesh>
    </group>
  )
}

function FemaleModel({ isSelected }: { isSelected: boolean }) {
  const group = useRef<THREE.Group>(null)

  useEffect(() => {
    if (group.current) {
      gsap.to(group.current.rotation, {
        y: isSelected ? Math.PI * 2 : 0,
        duration: 1.5,
        ease: "power2.out",
      })

      gsap.to(group.current.position, {
        y: isSelected ? 0.2 : 0,
        duration: 0.5,
        ease: "back.out",
      })
    }
  }, [isSelected])

  // Subtle animation
  useFrame((state) => {
    if (group.current && !isSelected) {
      group.current.rotation.y += 0.005
    }
  })

  return (
    <group ref={group}>
      {/* Base */}
      <mesh position={[0, -1.8, 0]} receiveShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.1, 32]} />
        <meshStandardMaterial color={isSelected ? "#22d3ee" : "#1e293b"} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Feet */}
      <mesh position={[-0.15, -1.6, 0]} castShadow>
        <boxGeometry args={[0.15, 0.1, 0.35]} />
        <meshStandardMaterial color="#f9a8d4" metalness={0.2} roughness={0.8} />
      </mesh>
      <mesh position={[0.15, -1.6, 0]} castShadow>
        <boxGeometry args={[0.15, 0.1, 0.35]} />
        <meshStandardMaterial color="#f9a8d4" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.15, -1, 0]} castShadow>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshStandardMaterial color="#f472b6" metalness={0.1} roughness={0.8} />
      </mesh>
      <mesh position={[0.15, -1, 0]} castShadow>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshStandardMaterial color="#f472b6" metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Dress/Skirt */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <coneGeometry args={[0.5, 1, 16]} />
        <meshStandardMaterial color="#db2777" metalness={0.2} roughness={0.7} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[0.6, 0.8, 0.35]} />
        <meshStandardMaterial color="#db2777" metalness={0.2} roughness={0.7} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.4, 0.1, 0]} castShadow>
        <capsuleGeometry args={[0.1, 0.7, 4, 8]} />
        <meshStandardMaterial color="#f472b6" metalness={0.2} roughness={0.7} />
      </mesh>
      <mesh position={[0.4, 0.1, 0]} castShadow>
        <capsuleGeometry args={[0.1, 0.7, 4, 8]} />
        <meshStandardMaterial color="#f472b6" metalness={0.2} roughness={0.7} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.2, 16]} />
        <meshStandardMaterial color="#fbcfe8" metalness={0.1} roughness={0.9} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#fbcfe8" metalness={0.1} roughness={0.9} />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 1, 0]} castShadow>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial color="#7e22ce" metalness={0.1} roughness={1} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.09, 0.95, 0.22]} castShadow>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.09, 0.95, 0.22]} castShadow>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Pupils */}
      <mesh position={[-0.09, 0.95, 0.25]} castShadow>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.09, 0.95, 0.25]} castShadow>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Mouth */}
      <mesh position={[0, 0.82, 0.22]} castShadow rotation={[0, 0, 0]}>
        <boxGeometry args={[0.08, 0.02, 0.01]} />
        <meshStandardMaterial color="#be185d" />
      </mesh>
    </group>
  )
}

function NonBinaryModel({ isSelected }: { isSelected: boolean }) {
  const group = useRef<THREE.Group>(null)

  useEffect(() => {
    if (group.current) {
      gsap.to(group.current.rotation, {
        y: isSelected ? Math.PI * 2 : 0,
        duration: 1.5,
        ease: "power2.out",
      })

      gsap.to(group.current.position, {
        y: isSelected ? 0.2 : 0,
        duration: 0.5,
        ease: "back.out",
      })
    }
  }, [isSelected])

  // Subtle animation
  useFrame((state) => {
    if (group.current && !isSelected) {
      group.current.rotation.y += 0.005
    }
  })

  return (
    <group ref={group}>
      {/* Base */}
      <mesh position={[0, -1.8, 0]} receiveShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.1, 32]} />
        <meshStandardMaterial color={isSelected ? "#22d3ee" : "#1e293b"} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Feet */}
      <mesh position={[-0.18, -1.6, 0]} castShadow>
        <boxGeometry args={[0.18, 0.1, 0.38]} />
        <meshStandardMaterial color="#c4b5fd" metalness={0.2} roughness={0.8} />
      </mesh>
      <mesh position={[0.18, -1.6, 0]} castShadow>
        <boxGeometry args={[0.18, 0.1, 0.38]} />
        <meshStandardMaterial color="#c4b5fd" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.18, -1, 0]} castShadow>
        <boxGeometry args={[0.22, 1, 0.22]} />
        <meshStandardMaterial color="#a78bfa" metalness={0.1} roughness={0.8} />
      </mesh>
      <mesh position={[0.18, -1, 0]} castShadow>
        <boxGeometry args={[0.22, 1, 0.22]} />
        <meshStandardMaterial color="#a78bfa" metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.65, 0.9, 0.38]} />
        <meshStandardMaterial color="#8b5cf6" metalness={0.2} roughness={0.7} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.42, 0, 0]} castShadow>
        <capsuleGeometry args={[0.11, 0.75, 4, 8]} />
        <meshStandardMaterial color="#a78bfa" metalness={0.2} roughness={0.7} />
      </mesh>
      <mesh position={[0.42, 0, 0]} castShadow>
        <capsuleGeometry args={[0.11, 0.75, 4, 8]} />
        <meshStandardMaterial color="#a78bfa" metalness={0.2} roughness={0.7} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.13, 0.2, 16]} />
        <meshStandardMaterial color="#ddd6fe" metalness={0.1} roughness={0.9} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <sphereGeometry args={[0.29, 32, 32]} />
        <meshStandardMaterial color="#ddd6fe" metalness={0.1} roughness={0.9} />
      </mesh>

      {/* Hair - undercut style */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32, 1, true]} />
        <meshStandardMaterial color="#4c1d95" metalness={0.1} roughness={1} />
      </mesh>
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[0.35, 0.1, 0.35]} />
        <meshStandardMaterial color="#4c1d95" metalness={0.1} roughness={1} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.1, 0.95, 0.23]} castShadow>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.1, 0.95, 0.23]} castShadow>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Pupils */}
      <mesh position={[-0.1, 0.95, 0.26]} castShadow>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.1, 0.95, 0.26]} castShadow>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Mouth */}
      <mesh position={[0, 0.82, 0.23]} castShadow rotation={[0, 0, 0]}>
        <boxGeometry args={[0.09, 0.02, 0.01]} />
        <meshStandardMaterial color="#7c3aed" />
      </mesh>
    </group>
  )
}

export { MaleModel, FemaleModel, NonBinaryModel }
