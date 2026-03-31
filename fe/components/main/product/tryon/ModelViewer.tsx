'use client'

import { Canvas, useThree } from '@react-three/fiber'
import { Environment, OrbitControls, ContactShadows, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { KTX2Loader, MeshoptDecoder } from 'three-stdlib'
import { Suspense, useMemo, useRef, useState, useEffect } from 'react'
import { useCustomizer } from '@/store/useCustomizer'
import { BODY_MODELS } from '@/lib/assetsCatalog'
import {
  CameraOutlined,
  DownloadOutlined,
  LeftOutlined,
  RightOutlined,
  PictureOutlined
} from '@ant-design/icons'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

const bgImages = [
  '/bg/bg1.jpg',
  '/bg/bg2.jpg',
  '/bg/bg3.jpg',
  '/bg/bg4.jpg'
]

function BackgroundImage({ url }: { url: string }) {
  const { scene } = useThree()

  useEffect(() => {
    new THREE.TextureLoader().load(url, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping
      scene.background = texture
    })
  }, [url, scene])

  return null
}

function BodyModel({ url }: { url: string }) {
  const gl = useThree((state) => state.gl)
  const gltf = useGLTF(url, true, true, (loader) => {
    const ktx2Loader = new KTX2Loader()
    ktx2Loader.setTranscoderPath('https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/basis/')
    ktx2Loader.detectSupport(gl)
    loader.setKTX2Loader(ktx2Loader)
    loader.setMeshoptDecoder(MeshoptDecoder)
  }) as any

  return <primitive object={gltf.scene} />
}

function Garment({ url }: { url: string }) {
  const gl = useThree((state) => state.gl)
  const gltf = useGLTF(url, true, true, (loader) => {
    const ktx2Loader = new KTX2Loader()
    ktx2Loader.setTranscoderPath('https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/basis/')
    ktx2Loader.detectSupport(gl)
    loader.setKTX2Loader(ktx2Loader)
    loader.setMeshoptDecoder(MeshoptDecoder)
  }) as any

  return <primitive object={gltf.scene} />
}

export default function ModelViewer() {
  const { bodyType, activeGarments, modelId } = useCustomizer()
  const controlsRef = useRef<OrbitControlsImpl | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [bgIndex, setBgIndex] = useState(0)

  useEffect(() => {
    const canvas = document.querySelector('canvas')
    if (canvas) canvasRef.current = canvas as HTMLCanvasElement
  }, [])

  const takeScreenshot = () => {
    if (!canvasRef.current) return null
    return canvasRef.current.toDataURL('image/png')
  }

  const downloadScreenshot = () => {
    const dataUrl = takeScreenshot()
    if (!dataUrl) return
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `outfit-${Date.now()}.png`
    a.click()
  }

  const prevBg = () => {
    setBgIndex((prev) => (prev === 0 ? bgImages.length - 1 : prev - 1))
  }

  const nextBg = () => {
    setBgIndex((prev) => (prev === bgImages.length - 1 ? 0 : prev + 1))
  }

  const gender = modelId === 'avatar_female' ? 'female' : 'male'
  const bodyUrl = BODY_MODELS[gender][bodyType]


  return (
    <div className="relative w-full h-full overflow-hidden">
      <Canvas
        shadows
        camera={{ position: [0, 1.2, 3.2], fov: 40 }}
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={null}>
          <BackgroundImage url={bgImages[bgIndex]} />

          <group position={[0, -0.9, 0]}>
            <BodyModel url={bodyUrl} />
            {activeGarments.top && <Garment url={activeGarments.top} />}
            {activeGarments.bottom && <Garment url={activeGarments.bottom} />}
            {activeGarments.shoes && <Garment url={activeGarments.shoes} />}

            <ContactShadows
              position={[0, -0.9, 0]}
              opacity={0.45}
              scale={6}
              blur={2.5}
              far={3}
              color="#e0e0e0"
            />
          </group>

          <Environment preset="studio" />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          minDistance={1.8}
          maxDistance={4.5}
        />
      </Canvas>

      <div className="absolute top-6 right-6 z-10">
        <div className="flex items-center gap-4 px-5 py-2 rounded-full bg-black/70 backdrop-blur-md shadow-lg">

          <button
            onClick={prevBg}
            className="text-white/70 hover:text-white transition hover:scale-110"
          >
            <LeftOutlined />
          </button>

          <div className="text-white/80">
            <PictureOutlined />
          </div>

          <button
            onClick={nextBg}
            className="text-white/70 hover:text-white transition hover:scale-110"
          >
            <RightOutlined />
          </button>

        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-10">
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md shadow-md">

          <button
            onClick={() => {
              const img = takeScreenshot()
              if (img) window.open(img, '_blank')
            }}
            className="text-gray-300 hover:text-white transition hover:scale-110"
            title="Chụp ảnh"
          >
            <CameraOutlined />
          </button>

          <button
            onClick={downloadScreenshot}
            className="text-gray-300 hover:text-white transition hover:scale-110"
            title="Tải ảnh"
          >
            <DownloadOutlined />
          </button>

        </div>
      </div>

      <div className="absolute bottom-6 left-6 z-10">
        <img
          src="/images/logo.png"
          alt="logo"
          className="h-6 w-auto opacity-80 hover:opacity-100 transition duration-300 drop-shadow-md"
        />
      </div>
    </div>
  )
}