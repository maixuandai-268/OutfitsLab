'use client'

import { Canvas, useLoader } from '@react-three/fiber'
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { GLTFLoader, GLTF } from 'three-stdlib'
import { Suspense, useMemo, useRef } from 'react'
import { useCustomizer } from '@/store/useCustomizer'
import { MATERIAL_TAGS } from '@/lib/materialMap'
import { makePatternTexture } from '@/lib/patterns'
import { BODY_MODELS } from '@/lib/assetsCatalog'
import { RedoOutlined, PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib' // <-- type cho ref

type Hex = `#${string}`
type Colors = { skin: Hex; top: Hex; bottom: Hex; shoes: Hex }
type PatternKey = 'none' | 'stripes' | 'polka' | 'plaid'
type Patterns = { top: PatternKey; bottom: PatternKey }

function isMesh(o: THREE.Object3D): o is THREE.Mesh {
  return (o as THREE.Mesh).isMesh === true
}
function isStdMat(m: THREE.Material): m is THREE.MeshStandardMaterial {
  return (m as THREE.MeshStandardMaterial).isMeshStandardMaterial === true
}
type EnvPreset =
  | 'apartment' | 'city' | 'dawn' | 'forest' | 'lobby'
  | 'night' | 'park' | 'studio' | 'sunset' | 'warehouse'


function applyToMaterial(
  src: THREE.Material,
  candidateName: string,
  colors: Colors,
  patterns: Patterns
) {
  if (!isStdMat(src)) return src

  const mat = src.clone()
  mat.roughness = 0.6
  mat.metalness = 0

  const includes = (tags: string[]) => tags.some((t) => candidateName.includes(t.toLowerCase()))
  const set = (hex: string, map?: THREE.Texture | null) => {
    mat.color = new THREE.Color(hex)
    mat.map = map ?? null
    if (mat.map) mat.map.needsUpdate = true
    mat.needsUpdate = true
  }

  if (includes(MATERIAL_TAGS.skin.map((s) => s.toLowerCase()))) {
    set(colors.skin)
  } else if (includes(MATERIAL_TAGS.top.map((s) => s.toLowerCase()))) {
    set(colors.top, makePatternTexture(patterns.top, colors.top))
  } else if (includes(MATERIAL_TAGS.bottom.map((s) => s.toLowerCase()))) {
    set(colors.bottom, makePatternTexture(patterns.bottom, colors.bottom))
  } else if (includes(MATERIAL_TAGS.shoes.map((s) => s.toLowerCase()))) {
    set(colors.shoes)
  }

  return mat
}

function materializeScene(scene: THREE.Object3D, colors: Colors, patterns: Patterns) {
  scene.traverse((obj) => {
    if (!isMesh(obj)) return

    const candidateName = (
      (!Array.isArray(obj.material) && obj.material ? obj.material.name : '') ||
      obj.name ||
      ''
    ).toLowerCase()

    if (Array.isArray(obj.material)) {
      obj.material = obj.material.map((m) => applyToMaterial(m, candidateName, colors, patterns) ?? m)
    } else if (obj.material) {
      const maybe = applyToMaterial(obj.material, candidateName, colors, patterns)
      if (maybe) obj.material = maybe
    }

    obj.castShadow = true
    obj.receiveShadow = true
  })
}


function BodyModel({ url }: { url: string }) {
  const gltf: GLTF = useLoader(GLTFLoader, url)
  const { colors, patterns } = useCustomizer()
  const c: Colors = colors as Colors
  const p: Patterns = patterns as Patterns

  useMemo(() => materializeScene(gltf.scene, c, p), [gltf.scene, c, p])
  return <primitive object={gltf.scene} />
}

function Garment({ url }: { url: string }) {
  const gltf: GLTF = useLoader(GLTFLoader, url)
  const { colors, patterns } = useCustomizer()
  const c: Colors = colors as Colors
  const p: Patterns = patterns as Patterns

  useMemo(() => materializeScene(gltf.scene, c, p), [gltf.scene, c, p])
  return <primitive object={gltf.scene} />
}


export default function ModelViewer() {
  const { autoRotate, background, modelId, activeGarments } = useCustomizer()
  const controlsRef = useRef<OrbitControlsImpl | null>(null) 

  const bgColor: string =
    background === 'neutral' ? '#ebebeb'
      : background === 'gradientWarm' ? '#f8e7d8'
      : background === 'gradientCool' ? '#e6eef7'
      : '#eaeaea'

  const envPreset: EnvPreset = background === 'studio' ? 'studio' : 'apartment'
  const shadowColor = background === 'shadow' ? '#d0d0d0' : '#e0e0e0'
  const bodyUrl = BODY_MODELS[modelId]

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Canvas shadows camera={{ position: [0, 1.2, 3.2], fov: 40 }} dpr={[1, 2]}>
        <color attach="background" args={[bgColor]} />
        <Suspense fallback={null}>
          <group position={[0, -0.9, 0]}>
            <BodyModel url={bodyUrl} />
            {activeGarments.top    && <Garment url={activeGarments.top} />}
            {activeGarments.bottom && <Garment url={activeGarments.bottom} />}
            {activeGarments.shoes  && <Garment url={activeGarments.shoes} />}

            <ContactShadows
              position={[0, -0.9, 0]}
              opacity={0.45}
              scale={6}
              blur={2.5}
              far={3}
              color={shadowColor}
            />
          </group>
          <Environment preset={envPreset} />
        </Suspense>

        <OrbitControls
          ref={controlsRef}              
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          minDistance={1.8}
          maxDistance={4.5}
          minPolarAngle={Math.PI * 0.1}
          maxPolarAngle={Math.PI * 0.9}
          autoRotate={autoRotate}
          autoRotateSpeed={0.8}
        />
      </Canvas>
      <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2">
        <AutoRotateBtn />
        <ResetViewBtn onReset={() => controlsRef.current?.reset()} /> {/* <-- gọi reset() */}
      </div>
    </div>
  )
}


function AutoRotateBtn() {
  const { autoRotate, toggleAutoRotate } = useCustomizer()
  return (
    <button
      onClick={toggleAutoRotate}
      className={`inline-flex items-center gap-2 rounded-md border bg-white/90 px-3 py-1 text-sm shadow ${
        autoRotate ? 'border-orange-400 text-orange-500' : 'border-gray-200 text-gray-700'
      }`}
      title="Bật/Tắt xoay tự động"
    >
      {autoRotate ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
      <span className="hidden sm:inline">
        {autoRotate ? 'Tự Động Xoay: Bật' : 'Tự Động Xoay: Tắt'}
      </span>
    </button>
  )
}

type ResetViewBtnProps = { onReset: () => void }
function ResetViewBtn({ onReset }: ResetViewBtnProps) {
  return (
    <button
      onClick={onReset}
      className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white/90 px-3 py-1 text-sm text-gray-700 shadow"
      title="Đặt lại góc nhìn"
    >
      <RedoOutlined rotate={-90} />
      <span className="hidden sm:inline">Đặt Lại Góc Nhìn</span>
    </button>
  )
}