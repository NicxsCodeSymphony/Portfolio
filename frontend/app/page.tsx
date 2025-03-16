"use client"
import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import MusicSection from '@/components/MusicSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import JourneySection from '@/components/JourneySection';
import LoadingScreen from '@/components/LoadingScreen';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [scrollY, setScrollY] = useState<number>(0);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const objectsRef = useRef<{
    particlesMesh: THREE.Points | null;
    musicNote: THREE.Mesh | null;
    codeBox: THREE.Mesh | null;
  }>({
    particlesMesh: null,
    musicNote: null,
    codeBox: null
  });

  useEffect(() => {
    const handleScroll = (): void => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015,
      color: 0x8e9aff,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    objectsRef.current.particlesMesh = particlesMesh;
    
    const musicNoteGeometry = new THREE.TorusKnotGeometry(0.7, 0.2, 128, 32);
    const musicNoteMaterial = new THREE.MeshStandardMaterial({
      color: 0x5271ff,
      wireframe: true,
      emissive: 0x5271ff,
      emissiveIntensity: 0.2,
    });
    const musicNote = new THREE.Mesh(musicNoteGeometry, musicNoteMaterial);
    musicNote.position.set(-3, 0, 0);
    scene.add(musicNote);
    objectsRef.current.musicNote = musicNote;
    
    const codeGeometry = new THREE.OctahedronGeometry(0.8, 1);
    const codeMaterial = new THREE.MeshStandardMaterial({
      color: 0xff5757,
      wireframe: true,
      emissive: 0xff5757,
      emissiveIntensity: 0.2,
    });
    const codeBox = new THREE.Mesh(codeGeometry, codeMaterial);
    codeBox.position.set(3, 0, 0);
    scene.add(codeBox);
    objectsRef.current.codeBox = codeBox;
    
    camera.position.z = 5;
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    const handleResize = (): void => {
      if (cameraRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    const mouse = new THREE.Vector2();
    
    const handleMouseMove = (event: MouseEvent): void => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      if (objectsRef.current.particlesMesh) {
        gsap.to(objectsRef.current.particlesMesh.rotation, {
          x: mouse.y * 0.1,
          y: mouse.x * 0.1,
          duration: 2,
          ease: "power2.out"
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    const animate = (): void => {
      requestAnimationFrame(animate);
      
      if (objectsRef.current.particlesMesh) {
        objectsRef.current.particlesMesh.rotation.y += 0.0005;
      }
      
      if (objectsRef.current.musicNote) {
        objectsRef.current.musicNote.rotation.y += 0.002;
      }
      
      if (objectsRef.current.codeBox) {
        objectsRef.current.codeBox.rotation.y -= 0.002;
      }
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    setTimeout(() => setLoading(false), 1500);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (particlesMesh) scene.remove(particlesMesh);
      if (musicNote) scene.remove(musicNote);
      if (codeBox) scene.remove(codeBox);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      musicNoteGeometry.dispose();
      musicNoteMaterial.dispose();
      codeGeometry.dispose();
      codeMaterial.dispose();
      renderer.dispose();
    };
  }, []);
  
  useEffect(() => {
    if (!sceneRef.current || !objectsRef.current.particlesMesh || !cameraRef.current) return;
    
    const { particlesMesh, musicNote, codeBox } = objectsRef.current;
    const camera = cameraRef.current;
    
    const scrollSpeed = scrollY / 5000;
    if (particlesMesh) {
      particlesMesh.rotation.y += scrollSpeed;
    }
    
    // Detect active section
    const sections = ['hero', 'about', 'projects', 'music', 'contact'];
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setActiveSection(section);
        }
      }
    });
    
    if (activeSection === 'hero') {
      gsap.to(camera.position, { z: 5, duration: 1, ease: "power2.out" });
    } else if (activeSection === 'music' && musicNote) {
      gsap.to(musicNote.position, { x: -1.5, y: 1, duration: 1, ease: "power2.out" });
      gsap.to(musicNote.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 1, ease: "power2.out" });
    } else if (activeSection === 'projects' && codeBox) {
      gsap.to(codeBox.position, { x: 1.5, y: 1, duration: 1, ease: "power2.out" });
      gsap.to(codeBox.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 1, ease: "power2.out" });
    } else {
      // Reset positions
      if (musicNote) {
        gsap.to(musicNote.position, { x: -3, y: 0, duration: 1, ease: "power2.out" });
        gsap.to(musicNote.scale, { x: 1, y: 1, z: 1, duration: 1, ease: "power2.out" });
      }
      if (codeBox) {
        gsap.to(codeBox.position, { x: 3, y: 0, duration: 1, ease: "power2.out" });
        gsap.to(codeBox.scale, { x: 1, y: 1, z: 1, duration: 1, ease: "power2.out" });
      }
    }
  }, [scrollY, activeSection]);
  
  useEffect(() => {
    if (loading) return;
    
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const content = section.querySelector('.section-content');
      if (content) {
        gsap.fromTo(
          content,
          { 
            y: 50, 
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 30%",
              scrub: 1,
            }
          }
        );
      }
    });
    
  }, [loading]);
  
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen">
      <Head>
        <title>John Nico M. Edisan | Musician & Full Stack Developer</title>
        <meta name="description" content="Portfolio of John Nico M. Edisan - Musician and Full Stack Developer showcasing creative projects and technical skills" />
        <meta name="keywords" content="musician, developer, portfolio, full stack, web development, music production" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Navbar activeSection={activeSection} />
          <main className="relative">
            <div id="hero" className="section">
              <HeroSection />
            </div>
            <div id="about" className="section">
              <AboutSection />
            </div>
            <div id="journey" className="section">
              <JourneySection />
            </div>
            <div id="projects" className="section">
              <ProjectsSection />
            </div>
            <div id="music" className="section">
              <MusicSection />  
            </div>
            <div id="contact" className="section">
              <ContactSection />
            </div>
          </main>
          <Footer />
        </>
      )}
    </div>
  );  
}