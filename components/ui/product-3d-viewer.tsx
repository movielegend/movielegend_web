'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Download, RotateCcw, Box, Info, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Product3DViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isRealCADLoaded, setIsRealCADLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.1;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(5, 10, 7);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1.8);
    dirLight2.position.set(-5, -2, -5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x14b8a6, 2.5, 10);
    pointLight.position.set(0, 2, 2);
    scene.add(pointLight);

    // Group for model
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Helper to create procedural CAD projector fallback
    const createProceduralModel = () => {
      const bodyGeo = new THREE.BoxGeometry(3.2, 1.6, 2.4);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.85,
        roughness: 0.25,
      });
      const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
      bodyMesh.castShadow = true;
      bodyMesh.receiveShadow = true;
      modelGroup.add(bodyMesh);

      const topGeo = new THREE.BoxGeometry(3.18, 0.05, 2.38);
      const topMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        metalness: 0.9,
        roughness: 0.15,
      });
      const topMesh = new THREE.Mesh(topGeo, topMat);
      topMesh.position.y = 0.82;
      modelGroup.add(topMesh);

      const lensRingGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.2, 32);
      const lensRingMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.95 });
      const lensRingMesh = new THREE.Mesh(lensRingGeo, lensRingMat);
      lensRingMesh.rotation.x = Math.PI / 2;
      lensRingMesh.position.set(-0.7, 0, 1.25);
      modelGroup.add(lensRingMesh);

      const lensGeo = new THREE.SphereGeometry(0.48, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
      const lensMat = new THREE.MeshPhysicalMaterial({
        color: 0x0284c7,
        transmission: 0.9,
        transparent: true,
        roughness: 0.05,
        ior: 1.5,
      });
      const lensMesh = new THREE.Mesh(lensGeo, lensMat);
      lensMesh.rotation.x = -Math.PI / 2;
      lensMesh.position.set(-0.7, 0, 1.3);
      modelGroup.add(lensMesh);
    };

    // Try loading actual converted GLB 3D CAD file A8-0306.glb
    const loader = new GLTFLoader();
    loader.load(
      '/models/A8-0306.glb',
      (gltf) => {
        modelGroup.clear();
        const loadedModel = gltf.scene;

        // Auto-center and fit model size
        const box = new THREE.Box3().setFromObject(loadedModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3.5 / maxDim;
        loadedModel.scale.set(scale, scale, scale);
        loadedModel.position.sub(center.multiplyScalar(scale));

        loadedModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            const mesh = child as THREE.Mesh;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.metalness = 0.6;
              mat.roughness = 0.3;
            }
          }
        });

        modelGroup.add(loadedModel);
        setIsRealCADLoaded(true);
        setLoading(false);
      },
      undefined,
      (err) => {
        console.log('GLB not available yet, using procedural CAD A8-0306 representation:', err);
        createProceduralModel();
        setLoading(false);
      }
    );

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isRotating) {
        modelGroup.rotation.y += 0.005;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
    };
  }, [isRotating]);

  return (
    <div className="relative w-full bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-slate-200/80 p-8 shadow-2xl overflow-hidden my-16">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 relative z-10 border-b border-slate-200/60 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600 bg-teal-100/80 px-3 py-1 rounded-full border border-teal-200">
              Mô Hình 3D CAD A8-0306 {isRealCADLoaded ? '(File CAD Gốc 1:1)' : ''}
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-slate-500">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Tương Tác 360° Realtime
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
            Trải Nghiệm Cấu Trúc Kỹ Thuật 3D
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-teal-600 hover:border-teal-400 transition-colors shadow-sm"
            title={isRotating ? 'Tạm dừng xoay' : 'Bật xoay tự động'}
          >
            <RotateCcw className={`w-5 h-5 ${isRotating ? 'animate-spin' : ''}`} />
          </button>
          
          <a href="/models/A8-0306.stp" download="A8-0306.stp">
            <Button className="rounded-full bg-teal-600 hover:bg-teal-500 text-white font-bold px-6 py-5 shadow-lg shadow-teal-600/25 flex items-center gap-2">
              <Download className="w-4 h-4" /> Tải File 3D CAD Gốc (.STP 140MB)
            </Button>
          </a>
        </div>
      </div>

      {/* 3D Canvas Container */}
      <div className="relative w-full h-[450px] md:h-[550px] cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden bg-gradient-to-b from-slate-100/60 via-slate-50/40 to-slate-200/60 flex items-center justify-center">
        
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 gap-3 z-20">
            <Box className="w-10 h-10 animate-bounce text-teal-600" />
            <p className="font-bold text-sm">Đang tải & dựng mô hình 3D CAD A8-0306...</p>
          </div>
        )}

        <div ref={containerRef} className="w-full h-full" />

        {/* Floating Instruction overlay */}
        <div className="absolute bottom-6 left-6 z-10 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-slate-200/80 text-xs font-bold text-slate-600 shadow-sm flex items-center gap-2">
          <Info className="w-4 h-4 text-teal-600" /> Kéo chuột trái để xoay 360° | Cuộn chuột để phóng to/thu nhỏ
        </div>
      </div>

      {/* CAD Specs Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 relative z-10">
        {[
          {
            title: 'Khung Nhôm Phay CNC A8-0306',
            desc: 'Bản vẽ mô hình CAD chi tiết chính xác đến 0.01mm, được tối ưu hóa cho môi trường lắp ráp chuyên nghiệp.',
            icon: ShieldCheck,
          },
          {
            title: 'Module Dual Laser Chùm Kép',
            desc: 'Thiết kế vị trí thấu kính và cảm biến hội tụ chuẩn xác theo tiêu chuẩn rạp chiếu phim công nghiệp.',
            icon: Sparkles,
          },
          {
            title: 'File Gốc Dành Cho B2B & Đại Lý',
            desc: 'Hỗ trợ tải trực tiếp file A8-0306.stp dành cho các kỹ sư, đơn vị thiết kế thi công nội thất rạp phim.',
            icon: Box,
          },
        ].map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div key={idx} className="bg-white/80 border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-teal-100/80 text-teal-700 flex items-center justify-center mb-4 border border-teal-200">
                <IconComponent className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-slate-900 mb-2 text-lg">{item.title}</h4>
              <p className="text-slate-600 text-sm font-normal leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
}
