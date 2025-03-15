"use client"
import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection.tsx';
import AboutSection from '../components/AboutSection.tsx';
import ProjectsSection from '../components/ProjectsSection.tsx';
import MusicSection from '../components/MusicSection.tsx';
import ContactSection from '../components/ContactSection.tsx';
import Footer from '../components/Footer';

export default function Home() {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Setup Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    // Create particles for background effect
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Materials
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x7a7a7a,
    });
    
    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Add music note shape
    const musicNoteGeometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
    const musicNoteMaterial = new THREE.MeshStandardMaterial({
      color: 0x5271ff,
      wireframe: true,
    });
    const musicNote = new THREE.Mesh(musicNoteGeometry, musicNoteMaterial);
    musicNote.position.set(-3, 0, 0);
    scene.add(musicNote);
    
    // Add code brackets shape representing development
    const codeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const codeMaterial = new THREE.MeshStandardMaterial({
      color: 0xff5757,
      wireframe: true,
    });
    const codeBox = new THREE.Mesh(codeGeometry, codeMaterial);
    codeBox.position.set(3, 0, 0);
    scene.add(codeBox);
    
    // Position camera
    camera.position.z = 5;
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      particlesMesh.rotation.y += 0.001;
      musicNote.rotation.y += 0.003;
      codeBox.rotation.y -= 0.003;
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    setLoading(false);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      scene.remove(particlesMesh);
      scene.remove(musicNote);
      scene.remove(codeBox);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      musicNoteGeometry.dispose();
      musicNoteMaterial.dispose();
      codeGeometry.dispose();
      codeMaterial.dispose();
      renderer.dispose();
    };
  }, []);
  
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Head>
        <title>John Nico M. Edisan | Musician & Full Stack Developer</title>
        <meta name="description" content="Portfolio of a musician and full stack developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <Navbar />
          <main>
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <MusicSection />
            <ContactSection />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
