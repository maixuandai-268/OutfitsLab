"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

export default function TryOnModel({
  shirtPath,
  color,
}: {
  shirtPath: string;
  color: string;
}) {
  const human = useGLTF("/models/human.glb");
  const shirt = useGLTF(shirtPath);

  useEffect(() => {
    shirt.scene.traverse((child: any) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.color = new THREE.Color(color);
      }
    });

    shirt.scene.position.set(0, 1.05, 0.02);
    shirt.scene.scale.set(1.05, 1.05, 1.05);
  }, [shirtPath, color]);

  return (
    <group>
      <primitive object={human.scene} />
      <primitive object={shirt.scene} />
    </group>
  );
}