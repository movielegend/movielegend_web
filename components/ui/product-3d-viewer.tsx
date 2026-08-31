'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Download, RotateCcw, Box, Info, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Hotspot {
  id: string;
  title: string;
  desc: string;
  position: THREE.Vector3;
}

export default function Product3DViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2.5, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Clean container before append
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.5);
    mainLight.position.set(5, 8, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
    fillLight.position.set(-5, -2, -5);
    scene.add(fillLight);

    const pointLight = new THREE.PointLight(0x06b6d4, 3, 10);
    pointLight.position.set(0, 1.5, 2);
    scene.add(pointLight);

    // 3D Model Group (Projector A8-0306 CAD Design Model)
    const modelGroup = new THREE.Group();

    // Metallic Body Chassis
    const bodyGeo = new THREE.BoxGeometry(3.2, 1.6, 2.4);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.25,
      envMapIntensity: 1.0,
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    modelGroup.add(bodyMesh);

    // Top Brushed Aluminum Panel
    const topGeo = new THREE.BoxGeometry(3.18, 0.05, 2.38);
    const topMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      metalness: 0.9,
      roughness: 0.15,
    });
    const topMesh = new THREE.Mesh(topGeo, topMat);
    topMesh.position.y = 0.82;
    modelGroup.add(topMesh);

    // Front Dual Laser Lens Ring
    const lensRingGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.2, 32);
    const lensRingMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.95,
      roughness: 0.1,
    });
    const lensRingMesh = new THREE.Mesh(lensRingGeo, lensRingMat);
    lensRingMesh.rotation.x = Math.PI / 2;
    lensRingMesh.position.set(-0.7, 0, 1.25);
    modelGroup.add(lensRingMesh);

    // Optical Glass Lens
    const lensGeo = new THREE.SphereGeometry(0.48, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const lensMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      transmission: 0.9,
      opacity: 1,
      transparent: true,
      roughness: 0.05,
      ior: 1.5,
      reflectivity: 0.9,
    });
    const lensMesh = new THREE.Mesh(lensGeo, lensMat);
    lensMesh.rotation.x = -Math.PI / 2;
    lensMesh.position.set(-0.7, 0, 1.3);
    modelGroup.add(lensMesh);

    // Secondary Sensor Eyepiece
    const sensorGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 24);
    const sensorMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, metalness: 0.8 });
    const sensorMesh = new THREE.Mesh(sensorGeo, sensorMat);
    sensorMesh.rotation.x = Math.PI / 2;
    sensorMesh.position.set(0.7, 0.2, 1.22);
    modelGroup.add(sensorMesh);

    // Side Ventilation Grille Fins
    for (let i = -1; i <= 1; i += 0.2) {
      const finGeo = new THREE.BoxGeometry(0.04, 1.2, 1.8);
      const finMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 });
      const finLeft = new THREE.Mesh(finGeo, finMat);
      finLeft.position.set(1.61, 0, i * 0.8);
      modelGroup.add(finLeft);

      const finRight = new THREE.Mesh(finGeo, finMat);
      finRight.position.set(-1.61, 0, i * 0.8);
      modelGroup.add(finRight);
    }

    // Base Feet
    const footGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.15, 16);
    const footMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });
    const footPositions = [
      [-1.3, -0.85, -0.9],
      [1.3, -0.85, -0.9],
      [-1.3, -0.85, 0.9],
      [1.3, -0.85, 0.9],
    ];
    footPositions.forEach(([x, y, z]) => {
      const foot = new THREE.Mesh(footGeo, footMat);
      foot.position.set(x, y, z);
      modelGroup.add(foot);
    });

    scene.add(modelGroup);
    setLoading(false);

    // Hotspots data
    const hotspots: Hotspot[] = [
      {
        id: 'lens',
        title: 'Thấu Kính Quang Học Dual Laser 4K',
        desc: 'Module thấu kính thủy tinh 7 lớp độ phân giải 3840x2160p cản quang sáng môi trường.',
        position: new THREE.Vector3(-0.7, 0.2, 1.3),
      },
      {
        id: 'body',
        title: 'Vỏ Nhôm Hợp Kim CAD A8-0306',
        desc: 'Bản vẽ kỹ thuật CAD A8-0306 gia công phay CNC nguyên khối chống rung động.',
        position: new THREE.Vector3(0, 0.85, 0),
      },
      {
        id: 'cooling',
        title: 'Tản Nhiệt Đồng Khối Siêu Êm',
        desc: 'Hệ thống rãnh tản nhiệt khe kép kiểm soát nhiệt độ dưới 35°C, độ ồn <20dB.',
        position: new THREE.Vector3(1.65, 0, 0),
      },
    ];

    // Interaction variables
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };

      modelGroup.rotation.y += deltaMove.x * 0.008;
      modelGroup.rotation.x += deltaMove.y * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaMove = {
        x: e.touches[0].clientX - previousMousePosition.x,
        y: e.touches[0].clientY - previousMousePosition.y,
      };
      modelGroup.rotation.y += deltaMove.x * 0.008;
      modelGroup.rotation.x += deltaMove.y * 0.008;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    domElement.addEventListener('touchstart', handleTouchStart);
    domElement.addEventListener('touchmove', handleTouchMove);
    domElement.addEventListener('touchend', handleTouchEnd);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isRotating && !isDragging) {
        modelGroup.rotation.y += 0.005;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
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
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('touchstart', handleTouchStart);
      domElement.removeEventListener('touchmove', handleTouchMove);
      domElement.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
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
              Mô Hình 3D CAD A8-0306
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
              <Download className="w-4 h-4" /> Tải File 3D CAD (.STP)
            </Button>
          </a>
        </div>
      </div>

      {/* 3D Canvas Container */}
      <div className="relative w-full h-[450px] md:h-[550px] cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden bg-gradient-to-b from-slate-100/60 via-slate-50/40 to-slate-200/60 flex items-center justify-center">
        
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 gap-3 z-20">
            <Box className="w-10 h-10 animate-bounce text-teal-600" />
            <p className="font-bold text-sm">Đang dựng mô hình 3D CAD A8-0306...</p>
          </div>
        )}

        <div ref={containerRef} className="w-full h-full" />

        {/* Floating Instruction overlay */}
        <div className="absolute bottom-6 left-6 z-10 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-slate-200/80 text-xs font-bold text-slate-600 shadow-sm flex items-center gap-2">
          <Info className="w-4 h-4 text-teal-600" /> Nhấp giữ chuột & di chuyển để xoay 360° mô hình A8-0306
        </div>

        {/* File Badge */}
        <div className="absolute top-6 right-6 z-10 bg-slate-900/90 text-white px-4 py-2.5 rounded-2xl border border-white/20 text-xs font-semibold shadow-lg flex items-center gap-2">
          <Layers className="w-4 h-4 text-teal-400" /> A8-0306.stp (140 MB CAD Solid)
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
