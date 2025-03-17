"use client"

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [noteFrequency, setNoteFrequency] = useState(440); // A4 note
  
  // Audio context for interactive sound
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const audioCtx = new AudioContext();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = noteFrequency;
    gainNode.gain.value = 0;
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    
    // Handle user interactions with sound
    const handleMouseMove = (e: MouseEvent) => {
      if (!isPlaying) return;
      // Map mouse X position to a musical frequency (pentatonic scale notes)
      const notes = [440, 493.88, 554.37, 659.25, 739.99]; // A4, B4, C#5, E5, F#5
      const noteIndex = Math.floor((e.clientX / window.innerWidth) * notes.length);
      const newFrequency = notes[noteIndex];
      
      setNoteFrequency(newFrequency);
      oscillator.frequency.setValueAtTime(newFrequency, audioCtx.currentTime);
      
      // Set volume based on Y position
      const volume = 1 - (e.clientY / window.innerHeight);
      gainNode.gain.setValueAtTime(isPlaying ? volume * 0.2 : 0, audioCtx.currentTime);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      oscillator.stop();
      audioCtx.close();
    };
  }, [isPlaying, noteFrequency]);

  // Text scramble effect
  useEffect(() => {
    if (!headingRef.current) return;
  
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let interval: NodeJS.Timeout | null = null;
  
    const startAnimation = () => {
      if (!headingRef.current) return;
  
      const originalText = headingRef.current.dataset.value || "";
  
      clearInterval(interval!);
  
      let iteration = 0;
      interval = setInterval(() => {
        if (!headingRef.current) return;
  
        headingRef.current.innerText = originalText
          .split("")
          .map((letter: string, index: number) => {
            if (index < iteration) {
              return originalText[index];
            }
  
            if (letter === " ") return " ";
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");
  
        if (iteration >= originalText.length) {
          clearInterval(interval!);
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
  
    if (headingRef.current) observer.observe(headingRef.current);
  
    return () => {
      if (interval) clearInterval(interval);
      if (headingRef.current) observer.unobserve(headingRef.current);
    };
  }, [isMounted]);
  
  // Piano key effect when typing
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const notes: {[key: string]: number} = {
        'a': 261.63, // C4
        'w': 277.18, // C#4
        's': 293.66, // D4
        'e': 311.13, // D#4
        'd': 329.63, // E4
        'f': 349.23, // F4
        't': 369.99, // F#4
        'g': 392.00, // G4
        'y': 415.30, // G#4
        'h': 440.00, // A4
        'u': 466.16, // A#4
        'j': 493.88, // B4
        'k': 523.25  // C5
      };
      
      const key = e.key.toLowerCase();
      if (notes[key] && isPlaying) {
        playNote(notes[key]);
      }
    };
    
    document.addEventListener('keypress', handleKeyPress);
    
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [isPlaying]);
  
  // Function to play a note
  const playNote = (frequency: number) => {
    if (!isPlaying) return;
    
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const audioCtx = new AudioContext();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gainNode.gain.value = 0.2;
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
    
    setTimeout(() => {
      oscillator.stop();
      audioCtx.close();
    }, 1000);
  };
  
  // Three.js 3D background effect
  useEffect(() => {
    if (!containerRef.current) return;
    setIsMounted(true);
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    
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
    
    // Create materials - dark theme colors
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: new THREE.Color(0x8b5cf6), // Purple
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
      color: 0x3b82f6,
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
    
    // Animation loop with audio reactivity
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Animate particles
      particlesMesh.rotation.y = elapsedTime * 0.05;
      particlesMesh.rotation.x = mouseY * 0.1;
      particlesMesh.rotation.z = mouseX * 0.1;
      
      // Add audio reactivity - particles pulsate when audio is playing
      if (isPlaying) {
        const pulseScale = 1 + Math.sin(elapsedTime * 4) * 0.05;
        particlesMesh.scale.set(pulseScale, pulseScale, pulseScale);
        particlesMaterial.size = 0.02 * (1 + Math.sin(elapsedTime * 8) * 0.2);
      }
      
      // Animate wave
      const positions = wavesGeometry.attributes.position;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        
        // More dynamic wave when audio is playing
        const frequencyFactor = isPlaying ? (noteFrequency / 440) * 0.5 : 0.5;
        const z = Math.sin(elapsedTime + x * frequencyFactor) * 0.5;
        
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
  }, [isMounted, isPlaying, noteFrequency]);
  
  // Toggle audio playback
  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };
  
  return (
    <section className="relative w-full h-screen overflow-hidden bg-gray-900 text-gray-200">
      <div ref={containerRef} className="absolute inset-0 z-0" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-gray-900/70 to-gray-900/90 z-10"></div>
      
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-3 flex items-center justify-center">
            <span className="h-px w-6 sm:w-8 mr-2 sm:mr-3 bg-purple-500 opacity-50"></span>
            <span className="uppercase tracking-widest text-xs sm:text-sm font-medium text-blue-400">Greetings! Visitors! I'm</span>
            <span className="h-px w-6 sm:w-8 ml-2 sm:ml-3 bg-blue-500 opacity-50"></span>
          </div>
          
          <h1 
            ref={headingRef}
            data-value="JOHN NICO M. EDISAN"
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 tracking-tighter bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
          >
            JOHN NICO M. EDISAN
          </h1>
          
          <h2 className="text-lg sm:text-xl md:text-2xl mb-6 text-gray-300 max-w-2xl mx-auto font-light px-2">
           Harmonizing code and creativity to orchestrate digital solutions.
          </h2>
          
          <div className="flex justify-center mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#projects" 
                className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 sm:px-8 py-3 sm:py-4 text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:translate-y-1"
              >
                <span className="relative z-10">View Projects</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
              <a 
                href="#music" 
                className="group relative overflow-hidden rounded-lg bg-transparent border border-purple-500 px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:translate-y-1"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="text-gray-200 group-hover:text-white transition-colors duration-300">Listen to Music</span>
              </a>
            </div>
          </div>
          
          {/* {isPlaying && (
            <div className="mb-8 p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg max-w-xs sm:max-w-md md:max-w-xl mx-auto border border-blue-500/20">
              <p className="text-blue-400 mb-2 font-medium text-sm sm:text-base">Interactive Music Enabled!</p>
              <p className="text-gray-300 text-xs sm:text-sm">
                Move your mouse to create sounds. Press A-K keys for piano notes (white keys) and W, E, T, Y, U keys for black keys (sharps). Explore the page to create your own musical experience.
              </p>
            </div>
          )} */}
          
          <button
            onClick={toggleAudio}
            className={`fixed bottom-4 sm:bottom-8 left-4 sm:left-8 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
              isPlaying 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-blue-500/30' 
                : 'bg-gray-800 border border-blue-500/30 text-blue-400'
            }`}
            aria-label={isPlaying ? 'Disable interactive music' : 'Enable interactive music'}
          >
            <span className="material-icons text-lg sm:text-xl">
              {isPlaying ? 'music_off' : 'music_note'}
            </span>
          </button>
        </div>
        
        <div className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-xs sm:max-w-md md:max-w-2xl px-4">
          <div className="flex justify-center mb-2">
            <span className="text-gray-400 text-xs sm:text-sm">Try the keyboard! (A-K for white keys, W,E,T,Y,U for black keys)</span>
          </div>
          <div className="flex justify-center overflow-x-auto pb-4">
            <div className="flex relative h-16 sm:h-20 md:h-24">
              {['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'].map((note, i) => (
                <button
                  key={`white-${i}`}
                  className="w-6 sm:w-8 md:w-10 h-16 sm:h-20 md:h-24 bg-gray-200 border border-gray-700 rounded-b flex items-end justify-center pb-2 hover:bg-blue-100 transition-colors duration-150"
                  onClick={() => {
                    const baseFreq = 261.63;
                    const freq = baseFreq * Math.pow(2, i/12);
                    playNote(freq);
                  }}
                >
                  <span className="text-gray-800 text-xs">{note}</span>
                </button>
              ))}
              
              <div className="absolute top-0 left-0 h-10 sm:h-12 md:h-14 w-full">
                <button 
                  className="absolute left-4 sm:left-6 md:left-7 w-4 sm:w-5 md:w-6 h-10 sm:h-12 md:h-14 bg-gray-800 rounded-b z-10 hover:bg-gray-700 transition-colors duration-150"
                  onClick={() => playNote(277.18)}
                ></button>
                <button 
                  className="absolute left-10 sm:left-14 md:left-17 w-4 sm:w-5 md:w-6 h-10 sm:h-12 md:h-14 bg-gray-800 rounded-b z-10 hover:bg-gray-700 transition-colors duration-150"
                  onClick={() => playNote(311.13)}
                ></button>
                <button 
                  className="absolute left-22 sm:left-30 md:left-37 w-4 sm:w-5 md:w-6 h-10 sm:h-12 md:h-14 bg-gray-800 rounded-b z-10 hover:bg-gray-700 transition-colors duration-150"
                  onClick={() => playNote(369.99)}
                ></button>
                <button 
                  className="absolute left-28 sm:left-38 md:left-47 w-4 sm:w-5 md:w-6 h-10 sm:h-12 md:h-14 bg-gray-800 rounded-b z-10 hover:bg-gray-700 transition-colors duration-150"
                  onClick={() => playNote(415.30)}
                ></button>
                <button 
                  className="absolute left-34 sm:left-46 md:left-57 w-4 sm:w-5 md:w-6 h-10 sm:h-12 md:h-14 bg-gray-800 rounded-b z-10 hover:bg-gray-700 transition-colors duration-150"
                  onClick={() => playNote(466.16)}
                ></button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-4 sm:bottom--10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          {/* <span className="text-gray-400 text-xs sm:text-sm mb-2">Scroll to explore</span> */}
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-purple-500 rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
        
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float text-blue-500 opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 5}s`,
                fontSize: `${Math.random() * 20 + 20}px`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            >
              ♪
            </div>
          ))}
          {[...Array(8)].map((_, i) => (
            <div
              key={i + 10}
              className="absolute animate-float text-purple-500 opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 5}s`,
                fontSize: `${Math.random() * 20 + 20}px`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            >
              ♫
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
