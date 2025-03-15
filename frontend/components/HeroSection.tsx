"use client"

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function HeroSection() {
  const headingRef = useRef(null);
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Text scramble effect
  useEffect(() => {
    if (!headingRef.current) return;
    
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let interval = null;
    
    const startAnimation = () => {
      let iteration = 0;
      const originalText = headingRef.current.dataset.value;
      
      clearInterval(interval);
      
      interval = setInterval(() => {
        headingRef.current.innerText = originalText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            
            if (letter === " ") return " ";
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");
        
        if (iteration >= originalText.length) {
          clearInterval(interval);
        }
        
        iteration += 1 / 3;
      }, 30);
    };
    
    startAnimation();
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(headingRef.current);
    
    return () => {
      clearInterval(interval);
      if (headingRef.current) observer.unobserve(headingRef.current);
    };
  }, [isMounted]);
  
  // Three.js 3D background effect
  useEffect(() => {
    if (!containerRef.current) return;
    setIsMounted(true);
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Responsive canvas size
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
    camera.position.z = 5;
    scene.add(camera);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Create music note particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create materials
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: new THREE.Color(0x3498db),
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    // Create mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Create "musical wave" effect with a mesh
    const wavesGeometry = new THREE.PlaneGeometry(20, 20, 50, 50);
    const wavesMaterial = new THREE.MeshBasicMaterial({
      color: 0x2980b9,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    
    const wavesMesh = new THREE.Mesh(wavesGeometry, wavesMaterial);
    wavesMesh.rotation.x = -Math.PI / 2;
    wavesMesh.position.y = -2;
    scene.add(wavesMesh);
    
    // Handle mouse movement
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
      mouseX = (event.clientX / sizes.width - 0.5) * 2;
      mouseY = (event.clientY / sizes.height - 0.5) * 2;
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      
      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      
      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
    
    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Animate particles
      particlesMesh.rotation.y = elapsedTime * 0.05;
      particlesMesh.rotation.x = mouseY * 0.1;
      particlesMesh.rotation.z = mouseX * 0.1;
      
      // Animate wave
      const positions = wavesGeometry.attributes.position;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = Math.sin(elapsedTime + x * 0.5) * 0.5;
        
        positions.setZ(i, z);
      }
      
      positions.needsUpdate = true;
      
      // Render scene
      renderer.render(scene, camera);
      
      // Continue loop
      window.requestAnimationFrame(animate);
    };
    
    animate();
    
    // Clean up on unmount
    return () => {
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', () => {});
    };
  }, [isMounted]);
  
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Three.js container */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 z-0"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/70 to-gray-900/90 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-3 flex items-center justify-center">
            <span className="h-px w-8 bg-blue-500 mr-3"></span>
            <span className="text-blue-500 uppercase tracking-widest text-sm font-medium">Portfolio</span>
            <span className="h-px w-8 bg-blue-500 ml-3"></span>
          </div>
          
          <h1 
            ref={headingRef}
            data-value="MUSICIAN & DEVELOPER"
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          >
            MUSICIAN & DEVELOPER
          </h1>
          
          <h2 className="text-xl md:text-2xl mb-12 text-gray-300 max-w-2xl mx-auto font-light">
            Creating harmonious experiences through code and sound
          </h2>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
            <a 
              href="#projects" 
              className="group relative overflow-hidden rounded-lg bg-blue-600 px-8 py-4 text-white transition-all duration-300"
            >
              <span className="relative z-10">View Projects</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
            <a 
              href="#music" 
              className="group relative overflow-hidden rounded-lg bg-transparent border border-white px-8 py-4 text-white transition-all duration-300"
            >
              <span className="relative z-10">Listen to Music</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              <span className="group-hover:text-gray-900 transition-colors duration-300">Listen to Music</span>
            </a>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-gray-400 text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-gray-400 rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}