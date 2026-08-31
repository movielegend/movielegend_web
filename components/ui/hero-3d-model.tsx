'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3DModel() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(0, 0.9, 5.5);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true, 
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Studio Lighting setup for Luxury Metal Reflections
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.5);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    fillLight.position.set(-6, 2, -4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x14b8a6, 4.0);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    // Procedural HDR Studio Reflection Environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0xffffff);
    const envLight1 = new THREE.DirectionalLight(0xffffff, 7);
    envLight1.position.set(5, 10, 5);
    envScene.add(envLight1);
    const envLight2 = new THREE.DirectionalLight(0x06b6d4, 4);
    envLight2.position.set(-5, -5, -5);
    envScene.add(envLight2);

    const envRt = pmremGenerator.fromScene(envScene);
    scene.environment = envRt.texture;

    // Contact Soft Drop Shadow
    const shadowGeo = new THREE.PlaneGeometry(6, 6);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const ctx = shadowCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      grad.addColorStop(0, 'rgba(15, 23, 42, 0.35)');
      grad.addColorStop(0.5, 'rgba(15, 23, 42, 0.12)');
      grad.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0.7 });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.25;
    scene.add(shadowMesh);

    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // LUXURY PBR MATERIALS
    // Champagne Gold / Titanium Anodized Alloy Body
    const alloyMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.92,
      roughness: 0.18,
      envMapIntensity: 2.5,
    });

    // Polished Gold / Metal Accent Trim
    const goldTrimMat = new THREE.MeshStandardMaterial({
      color: 0x0d9488,
      metalness: 0.95,
      roughness: 0.1,
      envMapIntensity: 3.0,
    });

    // Sapphire Optical Glass Lens with Emissive Glow Core
    const glassLensMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      transmission: 0.95,
      transparent: true,
      roughness: 0.02,
      ior: 1.55,
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    // Glowing Laser Lens Core
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 1.2,
    });

    // Build Gorgeous Photorealistic Flagship 4K Laser Projector
    // Curved Body Shell
    const mainGeo = new THREE.BoxGeometry(2.8, 1.5, 2.0);
    const mainMesh = new THREE.Mesh(mainGeo, alloyMat);
    mainMesh.castShadow = true;
    mainMesh.receiveShadow = true;
    modelGroup.add(mainMesh);

    // Top Metallic Plate
    const topPlateGeo = new THREE.BoxGeometry(2.78, 0.04, 1.98);
    const topPlateMesh = new THREE.Mesh(topPlateGeo, goldTrimMat);
    topPlateMesh.position.y = 0.77;
    modelGroup.add(topPlateMesh);

    // Dual Lens Outer Housing Ring
    const lensHousingGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.25, 32);
    const lensHousingMesh = new THREE.Mesh(lensHousingGeo, goldTrimMat);
    lensHousingMesh.rotation.x = Math.PI / 2;
    lensHousingMesh.position.set(-0.6, 0.1, 1.05);
    modelGroup.add(lensHousingMesh);

    // Optical Curved Glass Lens
    const lensGlassGeo = new THREE.SphereGeometry(0.48, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const lensGlassMesh = new THREE.Mesh(lensGlassGeo, glassLensMat);
    lensGlassMesh.rotation.x = -Math.PI / 2;
    lensGlassMesh.position.set(-0.6, 0.1, 1.15);
    modelGroup.add(lensGlassMesh);

    // Laser Glow Optical Core inside Lens
    const coreGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(-0.6, 0.1, 1.0);
    modelGroup.add(coreMesh);

    // Secondary AI Auto-Focus Sensor Eye
    const sensorGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.1, 24);
    const sensorMesh = new THREE.Mesh(sensorGeo, goldTrimMat);
    sensorMesh.rotation.x = Math.PI / 2;
    sensorMesh.position.set(0.6, 0.25, 1.02);
    modelGroup.add(sensorMesh);

    // Front Acoustic Fabric Fabric Texture Mesh
    const fabricGeo = new THREE.BoxGeometry(2.76, 1.46, 0.02);
    const fabricMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
    const fabricMesh = new THREE.Mesh(fabricGeo, fabricMat);
    fabricMesh.position.z = 1.01;
    modelGroup.add(fabricMesh);

    // Projector Base Pedestal Ring
    const baseRingGeo = new THREE.CylinderGeometry(1.0, 1.1, 0.15, 32);
    const baseRingMesh = new THREE.Mesh(baseRingGeo, goldTrimMat);
    baseRingMesh.position.y = -0.82;
    modelGroup.add(baseRingMesh);

    // Subtle Glowing Light Beam projecting into space
    const beamGeo = new THREE.ConeGeometry(2.0, 6, 32, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
    });
    const beamMesh = new THREE.Mesh(beamGeo, beamMat);
    beamMesh.rotation.x = Math.PI / 2;
    beamMesh.position.set(-0.6, 0.1, 4.0);
    modelGroup.add(beamMesh);

    // Floating Animation + Smooth Continuous Auto Spin
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth floating bobbing + gentle rotation
      modelGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;
      modelGroup.rotation.y += 0.008;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      pmremGenerator.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] md:h-[480px] flex items-center justify-center pointer-events-none my-2">
      
      {/* Tech Spec Floating Badges */}
      <div className="absolute top-10 left-4 md:left-20 z-10 bg-white/80 backdrop-blur-xl border border-slate-200/80 px-4 py-2 rounded-full text-xs font-extrabold text-slate-800 shadow-lg flex items-center gap-2 animate-pulse">
        <span className="w-2 h-2 rounded-full bg-teal-500" /> True 4K UHD Laser
      </div>

      <div className="absolute bottom-16 right-4 md:right-20 z-10 bg-white/80 backdrop-blur-xl border border-slate-200/80 px-4 py-2 rounded-full text-xs font-extrabold text-slate-800 shadow-lg flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-500" /> Dolby Vision & Atmos
      </div>

      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
