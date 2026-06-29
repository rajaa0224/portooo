import { Suspense, useRef, type RefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Physics,
  RigidBody,
  CuboidCollider,
  BallCollider,
  type RapierRigidBody,
} from '@react-three/rapier'
import { Text, Float } from '@react-three/drei'
import * as THREE from 'three'
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw, MousePointerClick } from 'lucide-react'
import { useDriveControls, type DriveControls } from './playgroundControls'

const START: [number, number, number] = [0, 3, 6]

/* ------------------------------- The player ------------------------------ */
function Player({ controls }: { controls: RefObject<DriveControls> }) {
  const body = useRef<RapierRigidBody>(null)
  const { camera } = useThree()
  const camTarget = useRef(new THREE.Vector3())

  useFrame((_, delta) => {
    const rb = body.current
    if (!rb) return
    const c = controls.current

    // Drive with impulses — gives real momentum / roll like a physics car.
    const strength = 11 * delta
    const impulse = { x: 0, y: 0, z: 0 }
    if (c.forward) impulse.z -= strength
    if (c.backward) impulse.z += strength
    if (c.left) impulse.x -= strength
    if (c.right) impulse.x += strength
    rb.applyImpulse(impulse, true)

    // Clamp horizontal speed so it stays controllable.
    const v = rb.linvel()
    const max = 9
    const speed = Math.hypot(v.x, v.z)
    if (speed > max) {
      rb.setLinvel({ x: (v.x / speed) * max, y: v.y, z: (v.z / speed) * max }, true)
    }

    // Fell off the world or reset requested → return to start.
    const p = rb.translation()
    if (p.y < -8 || c.resetRequest > 0) {
      c.resetRequest = 0
      rb.setTranslation({ x: START[0], y: START[1], z: START[2] }, true)
      rb.setLinvel({ x: 0, y: 0, z: 0 }, true)
      rb.setAngvel({ x: 0, y: 0, z: 0 }, true)
    }

    // Parallax chase camera — smoothly follows the ball from behind/above.
    const desired = new THREE.Vector3(p.x, p.y + 6, p.z + 11)
    camera.position.lerp(desired, 1 - Math.pow(0.001, delta))
    camTarget.current.lerp(new THREE.Vector3(p.x, p.y, p.z), 1 - Math.pow(0.0001, delta))
    camera.lookAt(camTarget.current)
  })

  return (
    <RigidBody
      ref={body}
      colliders={false}
      position={START}
      restitution={0.4}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
      canSleep={false}
    >
      <BallCollider args={[0.8]} />
      <mesh castShadow>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#b45309" roughness={0.35} metalness={0.2} />
      </mesh>
    </RigidBody>
  )
}

/* ------------------------------- The arena ------------------------------- */
function Ground() {
  return (
    <RigidBody type="fixed" friction={1} restitution={0.2}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#e9e4da" roughness={1} />
      </mesh>
      <CuboidCollider args={[30, 0.1, 30]} position={[0, -0.1, 0]} />

      {/* Perimeter walls so the ball stays in the arena */}
      <CuboidCollider args={[30, 2, 0.5]} position={[0, 2, -30]} />
      <CuboidCollider args={[30, 2, 0.5]} position={[0, 2, 30]} />
      <CuboidCollider args={[0.5, 2, 30]} position={[-30, 2, 0]} />
      <CuboidCollider args={[0.5, 2, 30]} position={[30, 2, 0]} />
    </RigidBody>
  )
}

function Obstacle({
  position,
  size,
  color,
}: {
  position: [number, number, number]
  size: [number, number, number]
  color: string
}) {
  return (
    <RigidBody type="fixed" position={position} friction={1}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
    </RigidBody>
  )
}

// A few loose boxes the player can shove around (dynamic bodies).
function Crate({ position }: { position: [number, number, number] }) {
  return (
    <RigidBody position={position} colliders="cuboid" restitution={0.3} friction={1}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshStandardMaterial color="#1f4e5f" roughness={0.6} />
      </mesh>
    </RigidBody>
  )
}

function Sign({
  position,
  children,
}: {
  position: [number, number, number]
  children: string
}) {
  return (
    <Float speed={2} floatIntensity={0.6} rotationIntensity={0.3}>
      <Text
        position={position}
        fontSize={1}
        color="#1c1c1a"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#f7f5f0"
      >
        {children}
      </Text>
    </Float>
  )
}

/* ----------------------------- Touch controls ---------------------------- */
function TouchPad({ controls }: { controls: RefObject<DriveControls> }) {
  function bind(key: 'forward' | 'backward' | 'left' | 'right') {
    return {
      onPointerDown: (e: React.PointerEvent) => {
        e.preventDefault()
        controls.current[key] = true
      },
      onPointerUp: () => {
        controls.current[key] = false
      },
      onPointerLeave: () => {
        controls.current[key] = false
      },
    }
  }
  const btn =
    'flex h-12 w-12 select-none items-center justify-center rounded-sm border border-ink/20 bg-white/80 text-ink backdrop-blur active:bg-accent active:text-white'

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-4 flex items-end justify-between px-4 md:hidden">
      <div className="pointer-events-auto grid grid-cols-3 gap-1.5">
        <span />
        <button className={btn} {...bind('forward')} aria-label="Forward">
          <ArrowUp size={20} />
        </button>
        <span />
        <button className={btn} {...bind('left')} aria-label="Left">
          <ArrowLeft size={20} />
        </button>
        <button className={btn} {...bind('backward')} aria-label="Backward">
          <ArrowDown size={20} />
        </button>
        <button className={btn} {...bind('right')} aria-label="Right">
          <ArrowRight size={20} />
        </button>
      </div>
      <button
        className={`pointer-events-auto ${btn}`}
        onPointerDown={() => controls.current.resetRequest++}
        aria-label="Reset"
      >
        <RotateCcw size={20} />
      </button>
    </div>
  )
}

/* ------------------------------ The wrapper ------------------------------ */
export default function Playground3D() {
  // The touch pad and the scene must share ONE controls ref.
  const sharedControls = useDriveControls()

  return (
    <section className="relative h-[88vh] w-full overflow-hidden bg-[#cfe0e6]">
      <Canvas shadows camera={{ position: [0, 9, 17], fov: 50 }} dpr={[1, 2]}>
        <color attach="background" args={['#cfe0e6']} />
        <fog attach="fog" args={['#cfe0e6', 30, 60]} />
        <Suspense fallback={null}>
          <SceneWith controls={sharedControls} />
        </Suspense>
      </Canvas>

      {/* On-screen instructions */}
      <div className="pointer-events-none absolute left-4 top-4 max-w-xs rounded-sm border border-ink/15 bg-white/70 p-3 text-xs text-ink backdrop-blur">
        <p className="flex items-center gap-1.5 font-medium">
          <MousePointerClick size={14} /> Drive the ball
        </p>
        <p className="mt-1 text-slate-muted">
          Use <span className="font-mono">W A S D</span> /{' '}
          <span className="font-mono">arrow keys</span> · press{' '}
          <span className="font-mono">R</span> to reset. On mobile, use the pad.
        </p>
      </div>

      <TouchPad controls={sharedControls} />
    </section>
  )
}

/* Scene variant that uses the externally-provided shared controls. */
function SceneWith({ controls }: { controls: RefObject<DriveControls> }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 18, 8]}
        intensity={1.4}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
      />
      <Physics gravity={[0, -20, 0]}>
        <Ground />
        <Player controls={controls} />
        <Obstacle position={[-8, 0.5, -6]} size={[3, 1, 3]} color="#cdbfa6" />
        <Obstacle position={[9, 1, -10]} size={[2, 2, 6]} color="#cdbfa6" />
        <Obstacle position={[0, 0.4, -14]} size={[8, 0.8, 1]} color="#cdbfa6" />
        <Crate position={[-3, 1, -2]} />
        <Crate position={[3, 1, -3]} />
        <Crate position={[0, 1, -7]} />
      </Physics>
      <Sign position={[0, 4, -16]}>RAJA&apos;S PLAYGROUND</Sign>
      <Sign position={[0, 2.2, -16]}>scroll down ↓</Sign>
    </>
  )
}
