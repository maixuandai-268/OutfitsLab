// components/main/homepage/ThreeScene.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import {
  Environment,
  OrbitControls,
  Html,
  useGLTF,
  Preload,
} from '@react-three/drei';
import * as THREE from 'three';
import React, { Suspense } from 'react';

type ThreeSceneProps = {
  modelUrl?: string;
  /** scale tổng thể của model */
  scale?: number;
  /** vị trí [x,y,z] của model */
  position?: [number, number, number];
  /** góc quay [x,y,z] radians của model */
  rotation?: [number, number, number];
  /** bật/tắt OrbitControls */
  controls?: boolean;
  /** Giới hạn zoom [min, max] cho OrbitControls (distance) */
  zoomLimits?: [number, number];
  /** Giới hạn góc dọc (polar) [min, max] radians cho OrbitControls */
  polarLimits?: [number, number];
  /** Bật/tắt shadow (mặc định false; nếu bật bạn nên thêm ContactShadows) */
  enableShadows?: boolean;
  /** Cho phép truyền className để Canvas bám flex-size của parent */
  className?: string;
  /** Inline style cho Canvas wrapper */
  style?: React.CSSProperties;
};

function Model({
  url,
  scale = 1,
  position = [0, -0.9, 0],
  rotation = [0, Math.PI, 0],
}: {
  url: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const { scene } = useGLTF(url);

  scene.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
      // Option: đảm bảo material hỗ trợ env-map/roughness đẹp
      if (obj.material && 'envMapIntensity' in obj.material) {
        obj.material.envMapIntensity = 0.8;
      }
    }
  });

  return (
    <primitive
      object={scene}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
}

export default function ThreeScene({
  modelUrl = '/model/body/avatar_male.glb',
  scale = 1.0,
  position = [0, -0.9, 0],
  rotation = [0, Math.PI, 0],
  controls = true,
  zoomLimits = [1.8, 4.5], // ✅ Giảm minDistance để zoom gần hơn
  polarLimits = [Math.PI / 3, Math.PI / 2],
  enableShadows = false,
  className,
  style,
}: ThreeSceneProps) {
  return (
    // Wrapper cần có kích thước (w/h) từ parent; ở đây ta chắc chắn Canvas fill 100%
    <div className={className} style={style}>
      <Canvas
        className="w-full h-full"
        gl={{ antialias: true }}
        // ✅ Camera gần hơn và FOV rộng hơn để model to hơn
        camera={{ position: [0, 0.3, 1.8], fov: 45 }}
        onCreated={(state) => {
          state.gl.setClearColor(new THREE.Color('#ffffff'), 0); // nền trong suốt
        }}
        // Shadows chỉ bật khi cần (tốn hiệu năng hơn)
        shadows={enableShadows}
        // Tối ưu DPR cho màn hình lớn/retina
        dpr={[1, 2]}
      >
        {/* Ánh sáng cơ bản dịu */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 3]} intensity={1.0} castShadow={enableShadows} />

        <Suspense
          fallback={
            <Html center>
              <div
                className="px-3 py-2 rounded-xl text-sm text-slate-600"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  boxShadow: '0 10px 30px rgba(0,0,0,.06)',
                  border: '1px solid rgba(255,255,255,.6)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                Đang tải avatar…
              </div>
            </Html>
          }
        >
          <Model url={modelUrl} scale={scale} position={position} rotation={rotation} />
          <Environment preset="city" />
          <Preload all />
        </Suspense>

        {controls && (
          <OrbitControls
            // makeDefault để controls bắt camera mặc định của Canvas
            makeDefault
            enablePan={false}
            minDistance={zoomLimits[0]}
            maxDistance={zoomLimits[1]}
            minPolarAngle={polarLimits[0]}
            maxPolarAngle={polarLimits[1]}
          />
        )}

        {/* Nếu muốn bóng tiếp xúc chân nhân vật, có thể bật:
            <ContactShadows position={[0, -1.0, 0]} opacity={0.3} scale={10} blur={2} />
        */}
      </Canvas>
    </div>
  );
}

// Preload model để lần đầu nhanh hơn
useGLTF.preload('/model/body/avatar_male.glb');