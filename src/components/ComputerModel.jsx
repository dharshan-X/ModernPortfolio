import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Float } from '@react-three/drei'

export default function ComputerModel({ scale = 1.5 }) {
  const groupRef = useRef()
  const { scene } = useGLTF('/assets/computer-3d-model/retro_computer.glb')

  useEffect(() => {
    if (!scene) return
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.envMapIntensity = 1.5
      }
    })
  }, [scene])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group 
        ref={groupRef} 
        scale={scale} 
        position={[2.5, -1, 0]} 
        rotation={[0.1, -0.6, 0]}
      >
        <primitive object={scene} />
      </group>
    </Float>
  )
}
