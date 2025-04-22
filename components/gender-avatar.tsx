"use client"

import React from "react"

import { useRef, useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"

type GenderAvatarProps = {
  type: "male" | "female" | "non-binary"
  isSelected: boolean
  onSelect: () => void
}

// Simple human models using Three.js primitives
function HumanModel({ type, isSelected }: { type: string; isSelected: boolean }) {
  const groupRef = useRef(null)

  // Colors for different genders
  const skinColor = type === "male" ? "#e0ac8f" : type === "female" ? "#f0c4a8" : "#d8b598"
  const hairColor = type === "male" ? "#3a3a3a" : type === "female" ? "#8b4513" : "#7851a9"
  const clothingColor = type === "male" ? "#3b82f6" : type === "female" ? "#ec4899" : "#8b5cf6"

  useEffect(() => {
    if (groupRef.current) {
      // Animation for selection
      const group = groupRef.current as any
      if (isSelected) {
        group.rotation.y = 0
        group.position.y = 0.2
      } else {
        group.rotation.y = 0
        group.position.y = 0
      }
    }
  }, [isSelected])

  return (
    <group ref={groupRef} position={[0, -1, 0]} scale={1}>
      {/* Head */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>

      {/* Hair - different styles for different genders */}
      {type === "male" && (
        <mesh position={[0, 1.7, 0]} castShadow>
          <sphereGeometry args={[0.45, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.3]} />
          <meshStandardMaterial color={hairColor} />
        </mesh>
      )}

      {type === "female" && (
        <group>
          <mesh position={[0, 1.5, 0]} castShadow>
            <sphereGeometry args={[0.55, 32, 32]} />
            <meshStandardMaterial color={hairColor} />
          </mesh>
          <mesh position={[0, 0.9, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.4, 0.7, 32]} />
            <meshStandardMaterial color={hairColor} />
          </mesh>
        </group>
      )}

      {type === "non-binary" && (
        <mesh position={[0, 1.65, 0]} castShadow>
          <boxGeometry args={[0.9, 0.3, 0.7]} />
          <meshStandardMaterial color={hairColor} />
        </mesh>
      )}

      {/* Eyes */}
      <mesh position={[-0.15, 1.55, 0.4]} castShadow>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0.15, 1.55, 0.4]} castShadow>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Pupils */}
      <mesh position={[-0.15, 1.55, 0.47]} castShadow>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[0.15, 1.55, 0.47]} castShadow>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Mouth */}
      <mesh position={[0, 1.3, 0.4]} castShadow>
        <boxGeometry args={[0.2, 0.05, 0.05]} />
        <meshStandardMaterial color="#c53030" />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.3, 32]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>

      {/* Body - different for each gender */}
      {type === "male" && (
        <group>
          {/* Torso - broader shoulders for male */}
          <mesh position={[0, 0.2, 0]} castShadow>
            <boxGeometry args={[0.9, 1.2, 0.5]} />
            <meshStandardMaterial color={clothingColor} />
          </mesh>

          {/* Arms */}
          <mesh position={[-0.55, 0.2, 0]} castShadow>
            <capsuleGeometry args={[0.15, 0.8, 8, 16]} />
            <meshStandardMaterial color={clothingColor} />
          </mesh>
          <mesh position={[0.55, 0.2, 0]} castShadow>
            <capsuleGeometry args={[0.15, 0.8, 8, 16]} />
            <meshStandardMaterial color={clothingColor} />
          </mesh>

          {/* Hands */}
          <mesh position={[-0.55, -0.3, 0]} castShadow>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color={skinColor} />
          </mesh>
          <mesh position={[0.55, -0.3, 0]} castShadow>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color={skinColor} />
          </mesh>

          {/* Legs */}
          <mesh position={[-0.25, -1.2, 0]} castShadow>
            <capsuleGeometry args={[0.2, 1.5, 8, 16]} />
            <meshStandardMaterial color="#1f2937" /> {/* Pants */}
          </mesh>
          <mesh position={[0.25, -1.2, 0]} castShadow>
            <capsuleGeometry args={[0.2, 1.5, 8, 16]} />
            <meshStandardMaterial color="#1f2937" /> {/* Pants */}
          </mesh>

          {/* Feet */}
          <mesh position={[-0.25, -2.1, 0.1]} castShadow>
            <boxGeometry args={[0.25, 0.2, 0.5]} />
            <meshStandardMaterial color="#4b5563" /> {/* Shoes */}
          </mesh>
          <mesh position={[0.25, -2.1, 0.1]} castShadow>
            <boxGeometry args={[0.25, 0.2, 0.5]} />
            <meshStandardMaterial color="#4b5563" /> {/* Shoes */}
          </mesh>
        </group>
      )}

      {type === "female" && (
        <group>
          {/* Torso - narrower waist for female */}
          <mesh position={[0, 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.4, 0.3, 1.2, 32]} />
            <meshStandardMaterial color={clothingColor} />
          </mesh>

          {/* Arms */}
          <mesh position={[-0.5, 0.2, 0]} castShadow>
            <capsuleGeometry args={[0.12, 0.8, 8, 16]} />
            <meshStandardMaterial color={clothingColor} />
          </mesh>
          <mesh position={[0.5, 0.2, 0]} castShadow>
            <capsuleGeometry args={[0.12, 0.8, 8, 16]} />
            <meshStandardMaterial color={clothingColor} />
          </mesh>

          {/* Hands */}
          <mesh position={[-0.5, -0.3, 0]} castShadow>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color={skinColor} />
          </mesh>
          <mesh position={[0.5, -0.3, 0]} castShadow>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color={skinColor} />
          </mesh>

          {/* Skirt */}
          <mesh position={[0, -0.7, 0]} castShadow>
            <coneGeometry args={[0.6, 0.8, 32]} />
            <meshStandardMaterial color="#ec4899" />
          </mesh>

          {/* Legs */}
          <mesh position={[-0.2, -1.5, 0]} castShadow>
            <capsuleGeometry args={[0.15, 1.2, 8, 16]} />
            <meshStandardMaterial color={skinColor} />
          </mesh>
          <mesh position={[0.2, -1.5, 0]} castShadow>
            <capsuleGeometry args={[0.15, 1.2, 8, 16]} />
            <meshStandardMaterial color={skinColor} />
          </mesh>

          {/* Feet */}
          <mesh position={[-0.2, -2.2, 0.1]} castShadow>
            <boxGeometry args={[0.2, 0.15, 0.4]} />
            <meshStandardMaterial color="#be185d" /> {/* Shoes */}
          </mesh>
          <mesh position={[0.2, -2.2, 0.1]} castShadow>
            <boxGeometry args={[0.2, 0.15, 0.4]} />
            <meshStandardMaterial color="#be185d" /> {/* Shoes */}
          </mesh>
        </group>
      )}

      {type === "non-binary" && (
        <group>
          {/* Torso - balanced proportions for non-binary */}
          <mesh position={[0, 0.2, 0]} castShadow>
            <boxGeometry args={[0.7, 1.2, 0.5]} />
            <meshStandardMaterial color={clothingColor} />
          </mesh>

          {/* Arms */}
          <mesh position={[-0.5, 0.2, 0]} castShadow>
            <capsuleGeometry args={[0.14, 0.8, 8, 16]} />
            <meshStandardMaterial color={clothingColor} />
          </mesh>
          <mesh position={[0.5, 0.2, 0]} castShadow>
            <capsuleGeometry args={[0.14, 0.8, 8, 16]} />
            <meshStandardMaterial color={clothingColor} />
          </mesh>

          {/* Hands */}
          <mesh position={[-0.5, -0.3, 0]} castShadow>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshStandardMaterial color={skinColor} />
          </mesh>
          <mesh position={[0.5, -0.3, 0]} castShadow>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshStandardMaterial color={skinColor} />
          </mesh>

          {/* Legs */}
          <mesh position={[-0.22, -1.2, 0]} castShadow>
            <capsuleGeometry args={[0.18, 1.5, 8, 16]} />
            <meshStandardMaterial color="#4c1d95" /> {/* Pants */}
          </mesh>
          <mesh position={[0.22, -1.2, 0]} castShadow>
            <capsuleGeometry args={[0.18, 1.5, 8, 16]} />
            <meshStandardMaterial color="#4c1d95" /> {/* Pants */}
          </mesh>

          {/* Feet */}
          <mesh position={[-0.22, -2.1, 0.1]} castShadow>
            <boxGeometry args={[0.22, 0.18, 0.45]} />
            <meshStandardMaterial color="#7c3aed" /> {/* Shoes */}
          </mesh>
          <mesh position={[0.22, -2.1, 0.1]} castShadow>
            <boxGeometry args={[0.22, 0.18, 0.45]} />
            <meshStandardMaterial color="#7c3aed" /> {/* Shoes */}
          </mesh>
        </group>
      )}

      {/* Base */}
      <mesh position={[0, -2.3, 0]} receiveShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.1, 32]} />
        <meshStandardMaterial color={isSelected ? "#22d3ee" : "#1e293b"} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

// Fallback component for when 3D rendering fails
function FallbackAvatar({ type, isSelected }: { type: string; isSelected: boolean }) {
  return (
    <div className="h-full flex items-center justify-center">
      <div
        className={`w-32 h-32 rounded-full transition-all duration-300 ${
          isSelected ? "scale-110 shadow-lg shadow-cyan-500/20" : ""
        }`}
        style={{
          backgroundColor: type === "male" ? "#3b82f6" : type === "female" ? "#ec4899" : "#8b5cf6",
        }}
      />
    </div>
  )
}

export function GenderAvatar({ type, isSelected, onSelect }: GenderAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [is3DFailed, setIs3DFailed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (!isMounted || !containerRef.current) return

    const container = containerRef.current
    const animation = {
      scale: isSelected ? 1.05 : 1,
    }

    container.style.transform = `scale(${animation.scale})`
  }, [isSelected, isMounted])

  // Handle 3D rendering errors
  const handle3DError = () => {
    setIs3DFailed(true)
  }

  if (!isMounted) {
    return null
  }

  return (
    <div
      ref={containerRef}
      onClick={onSelect}
      className={`
        bg-gray-900/70 backdrop-blur-md rounded-xl border-2 
        ${isSelected ? "border-cyan-500 shadow-lg shadow-cyan-500/20" : "border-gray-800"} 
        p-4 cursor-pointer transition-all duration-300 hover:border-cyan-500/50
      `}
      style={{ transition: "transform 0.3s ease-out" }}
    >
      <div className="h-64 mb-4">
        {!is3DFailed ? (
          <ErrorBoundary onError={handle3DError}>
            <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <HumanModel type={type} isSelected={isSelected} />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={!isSelected}
                autoRotateSpeed={3}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.5}
              />
              <Environment preset="studio" />
            </Canvas>
          </ErrorBoundary>
        ) : (
          <FallbackAvatar type={type} isSelected={isSelected} />
        )}
      </div>

      <h3 className="text-xl font-bold text-white mb-2">
        {type === "male" ? "Male" : type === "female" ? "Female" : "Non-Binary"}
      </h3>

      <p className="text-gray-400 text-sm">
        {type === "male"
          ? "Masculine clothing styles and size recommendations"
          : type === "female"
            ? "Feminine clothing styles and size recommendations"
            : "Gender-neutral clothing styles and size recommendations"}
      </p>
    </div>
  )
}

// Simple error boundary component
class ErrorBoundary extends React.Component<{ children: React.ReactNode; onError: () => void }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any) {
    console.error("Three.js error:", error)
    this.props.onError()
  }

  render() {
    if (this.state.hasError) {
      return null
    }
    return this.props.children
  }
}
