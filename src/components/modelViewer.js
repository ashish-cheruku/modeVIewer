"use client"
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function ModelViewer() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Canvas camera={{ position: [0, 0, 3] }}>
      <Environment preset="studio" />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Suspense fallback={null}>
          <Model url="/api/model" />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}


